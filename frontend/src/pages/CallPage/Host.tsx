import { Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserMedia } from './useUserMedia'

const Host = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)

  const [peerConnection] = usePeerConnection({ iceServers: [{'urls': 'stun:stun.l.google.com:19302'}] })
  const [localStream] = useUserMedia({ video: true, audio: false })
  useStreamToVideo(localVideoRef.current, localStream)

  const [remoteStream] = useRemoteStream(peerConnection)
  useStreamToVideo(remoteVideoRef.current, remoteStream)
  console.log({ remoteStream })

  const [offer, localCandidates] = useLocalSignalling(peerConnection, localStream)
  console.log({ offer, localCandidates })
  // const [answer, remoteCandidates] = useWaitForCall(roomId, offer, localCandidates)
  // useProcessRemote(answer, remoteCandidate)

  return (
    <Grid container spacing={2} marginTop={4}>
      <Grid item xs={6} component='video' ref={localVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={remoteVideoRef} autoPlay playsInline height={300} />
    </Grid>
  )
}

export default Host

const useStreamToVideo = (videoElement: HTMLVideoElement | null, stream?: MediaStream) => {
  useEffect(() => {
    if (videoElement && stream) {
      videoElement.srcObject = stream
    }
  }, [stream?.id])
}

const usePeerConnection = (configuration?: RTCConfiguration) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>()

  const stringConfig = configuration ? JSON.stringify(configuration) : ''
  useEffect(() => {
    const pc = new RTCPeerConnection(configuration)
    setPeerConnection(pc)
  }, [stringConfig])

  return [peerConnection]
}

const useLocalSignalling = (peerConnection?: RTCPeerConnection, stream?: MediaStream) => {
  const [offer, setOffer] = useState<RTCSessionDescriptionInit>()
  const [candidates, setCandidates] = useState<RTCIceCandidate[]>()

  useEffect(() => {
    const start = async () => {
      if(!stream || !peerConnection) return

      const tracks = stream?.getTracks()
      tracks?.forEach(track => peerConnection.addTrack(track))

      let offer: RTCSessionDescriptionInit
      const candidates: RTCIceCandidate[] = []
      peerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) candidates.push(event.candidate)
      })
      peerConnection.addEventListener('icegatheringstatechange', event => {
        if(peerConnection.iceGatheringState === 'complete') {
          setOffer(offer)
          setCandidates(candidates)
        }
      })

      offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
    }
    start()
  }, [stream?.id])

  return [offer, candidates]
}

const useRemoteStream = (peerConnection?: RTCPeerConnection) => {
  const [stream, setStream] = useState<MediaStream>()

  useEffect(() => {
    const handleTrackEvent = (event: RTCTrackEvent) => {
      const stream = event.streams?.[0] || new MediaStream([event.track])
      setStream(stream)
    }

    peerConnection?.addEventListener('track', handleTrackEvent)
    return () => {
      peerConnection?.removeEventListener('track', handleTrackEvent)
    }
  }, [peerConnection?.connectionState])

  return [stream]
}