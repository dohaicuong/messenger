import { useEffect, useRef, useState } from 'react'

const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

const CallPage = () => {
  const [stream] = useUserMedia({ video: true })
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream?.id])

  const [tracks, setTracks] = useState<MediaStreamTrack[]>()
  useEffect(() => {
    if (videoRef.current && stream) {
      const _tracks = stream.getTracks()
      setTracks(_tracks)
    }
  }, [stream?.id])

  const [localPeerConnection, offer, localCandidates] = usePeerConnection(
    configuration,
    tracks
  )

  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  // useEffect(() => {
  //   if(localPeerConnection) {
  //     localPeerConnection.addEventListener('track', event => {
  //       const [remoteStream] = event.streams
  //       console.log(remoteStream)

  //       if(remoteVideoRef.current) {
  //         remoteVideoRef.current.srcObject = remoteStream 
  //       }
  //     })
  //   }
  // }, [localPeerConnection?.connectionState])

  
  useEffect(() => {
    const start = async () => {
      if (!offer || !localCandidates?.length) return

      const remotePeerConnection = new RTCPeerConnection(configuration)
      
      const _candidates: RTCIceCandidate[] = []
      let _answer: RTCSessionDescriptionInit
      remotePeerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) _candidates.push(event.candidate)
      })
      remotePeerConnection.addEventListener('icegatheringstatechange', async event => {
        if(remotePeerConnection.iceGatheringState === 'complete') {
          console.log({
            _answer,
            _candidates
          })

          await localPeerConnection?.setRemoteDescription(new RTCSessionDescription(_answer))
          for (const candidate of _candidates) {
            await localPeerConnection?.addIceCandidate(candidate)
          } 
        }
      })
      remotePeerConnection.addEventListener('track', event => {
        const [remoteStream] = event.streams
        console.log(remoteStream)
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
    <>
      <video ref={videoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </>
  )
}

export default CallPage

const useUserMedia = (constraints?: MediaStreamConstraints | undefined) => {
  const [stream, setStream] = useState<MediaStream>()
  const [error, setError] = useState()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(setStream)
      .catch(setError)
  }, [constraints?.video, constraints?.audio, constraints?.peerIdentity, constraints?.preferCurrentTab])

  return [stream, error]
}

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