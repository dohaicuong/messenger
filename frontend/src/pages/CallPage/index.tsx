import { Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useUserMedia } from './useUserMedia'

const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

const CallPage = () => {
  const [stream1] = useUserMedia({ video: true, audio: false })
  const user1LocalVideoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (user1LocalVideoRef.current && stream1) {
      user1LocalVideoRef.current.srcObject = stream1
    }
  }, [stream1?.id])
  
  const [video1Tracks, setVideo1Tracks] = useState<MediaStreamTrack[]>()
  useEffect(() => {
    if (user1LocalVideoRef.current && stream1) {
      const _tracks = stream1.getTracks()
      setVideo1Tracks(_tracks)
    }
  }, [stream1?.id])


  const [stream2] = useUserMedia({ video: true, audio: false })
  const user2LocalVideoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (user2LocalVideoRef.current && stream2) {
      user2LocalVideoRef.current.srcObject = stream2
    }
  }, [stream2?.id])
  const [video2Tracks, setVideo2Tracks] = useState<MediaStreamTrack[]>()
  useEffect(() => {
    if (user2LocalVideoRef.current && stream2) {
      const _tracks = stream2.getTracks()
      setVideo2Tracks(_tracks)
    }
  }, [stream2?.id])

  
  const user1RemoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const user2RemoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const [localPeerConnection, offer, localCandidates] = usePeerConnection(
    configuration,
    video1Tracks
  )
  
  useEffect(() => {
    if(localPeerConnection) {
      localPeerConnection.addEventListener('track', event => {
        const stream = 
          event.streams?.[0]
          || new MediaStream([event.track])
        
        if(user1RemoteVideoRef.current) user1RemoteVideoRef.current.srcObject = stream
      })
    }
  }, [localPeerConnection?.connectionState])
  
  useEffect(() => {
    const start = async () => {
      if (!offer || !localCandidates?.length) return

      const remotePeerConnection = new RTCPeerConnection(configuration)
      video2Tracks?.forEach(track => remotePeerConnection.addTrack(track))

      const _candidates: RTCIceCandidate[] = []
      let _answer: RTCSessionDescriptionInit
      remotePeerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) _candidates.push(event.candidate)
      })
      remotePeerConnection.addEventListener('icegatheringstatechange', async event => {
        if(remotePeerConnection.iceGatheringState === 'complete') {
          await localPeerConnection?.setRemoteDescription(new RTCSessionDescription(_answer))
          for (const candidate of _candidates) {
            await localPeerConnection?.addIceCandidate(candidate)
          } 
        }
      })
      remotePeerConnection.addEventListener('track', event => {
        const remoteStream = 
          event.streams?.[0]
          || new MediaStream([event.track])
        
        if(user2RemoteVideoRef.current) user2RemoteVideoRef.current.srcObject = remoteStream
      })

      await remotePeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
      _answer = await remotePeerConnection.createAnswer()

      await remotePeerConnection.setLocalDescription(_answer)

      for (const candidate of localCandidates) {
        await remotePeerConnection.addIceCandidate(candidate)
      }
    }

    start()
  }, [offer?.type])

  return (
    <Grid container spacing={2}>
      <Grid item xs={1} />
      <Grid item xs={5} style={{ textAlign: 'center' }}>LOCAL</Grid>
      <Grid item xs={6} style={{ textAlign: 'center' }}>REMOTE</Grid>

      <Grid item xs={1}>USER 1</Grid>
      <Grid item xs={5} component='video' ref={user1LocalVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={user1RemoteVideoRef} autoPlay playsInline height={300} />

      <Grid item xs={1}>USER 2</Grid>
      <Grid item xs={5} component='video' ref={user2LocalVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={user2RemoteVideoRef} autoPlay playsInline height={300} />
    </Grid>
  )
}

export default CallPage

const usePeerConnection = (configuration?: RTCConfiguration, tracks?: MediaStreamTrack[])
: [RTCPeerConnection | undefined, RTCSessionDescriptionInit | undefined, RTCIceCandidate[] | undefined] => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>()
  const [offer, setOffer] = useState<RTCSessionDescriptionInit>()
  const [candidates, setCandidates] = useState<RTCIceCandidate[]>()

  useEffect(() => {
    const start = async () => {
      const peerConnection = new RTCPeerConnection(configuration)
      tracks?.forEach(track => peerConnection.addTrack(track))

      const _candidates: RTCIceCandidate[] = []
      let _offer: RTCSessionDescriptionInit
      peerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) _candidates.push(event.candidate)
      })
      peerConnection.addEventListener('icegatheringstatechange', event => {
        if(peerConnection.iceGatheringState === 'complete') {
          setPeerConnection(peerConnection)
          setOffer(_offer)
          setCandidates(_candidates)
        }
      })
      
      _offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(_offer)
    }
    if(tracks?.length) start()
  }, [tracks?.length])

  return [peerConnection, offer, candidates]
}
