import { useEffect, useState } from 'react'

type UseLocalSignallingPayload = [
  RTCSessionDescriptionInit | undefined,
  RTCIceCandidate[] | undefined
]
export const useLocalSignalling = (peerConnection?: RTCPeerConnection, stream?: MediaStream): UseLocalSignallingPayload => {
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
