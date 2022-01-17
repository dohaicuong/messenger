import { useEffect, useState } from 'react'

type UseRemoteCallback = (stream: MediaStream) => void

export const useRemoteStream = (callback: UseRemoteCallback, peerConnection?: RTCPeerConnection) => {
  useEffect(() => {
    const handleTrackEvent = (event: RTCTrackEvent) => {
      const stream = event.streams?.[0] || new MediaStream([event.track])
      callback(stream)
    }

    peerConnection?.addEventListener('track', handleTrackEvent)
    // return () => {
    //   peerConnection?.removeEventListener('track', handleTrackEvent)
    // }
  }, [Boolean(peerConnection)])
}
