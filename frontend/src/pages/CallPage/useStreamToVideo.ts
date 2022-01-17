import { useEffect } from 'react'

export const useStreamToVideo = (videoElement: HTMLVideoElement | null, stream?: MediaStream) => {
  useEffect(() => {
    if (videoElement && stream) {
      videoElement.srcObject = stream
    }
  })
}
