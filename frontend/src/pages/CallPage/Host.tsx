import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useSubscription, graphql } from 'react-relay'
import { useParams } from 'react-router-dom'
import { useLocalSignalling } from './useLocalSignalling'
import { usePeerConnection } from './usePeerConnection'
import { useRemoteStream } from './useRemoteStream'
import { useStreamToVideo } from './useStreamToVideo'
import { useUserMedia } from './useUserMedia'
import { HostCallJoinedSubscription, HostCallJoinedSubscriptionResponse } from './__generated__/HostCallJoinedSubscription.graphql'
import { HostCallStartMutation } from './__generated__/HostCallStartMutation.graphql'

const Host = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const [peerConnection] = usePeerConnection({ iceServers: [{'urls': 'stun:stun.l.google.com:19302'}] })
  const [localStream] = useUserMedia({ video: true, audio: false })
  useStreamToVideo(localVideoRef.current, localStream)

  const [serverSignal, setServerSignal] = useState<{ answer?: string, guestIceCandidates?: string[] }>({
    answer: undefined,
    guestIceCandidates: undefined
  })
  const config = useMemo(
    () => {
      return {
        subscription: CallJoinedSubscriptionQuery,
        variables: {
          input: { callRoomId: roomId }
        },
        onNext: async (res?: HostCallJoinedSubscriptionResponse | null) => {
          if (!res?.callJoined?.callRoom) return

          const { answer, guestIceCandidates } = res.callJoined.callRoom
          if(!answer) return
          setServerSignal({
            answer,
            guestIceCandidates: Array.from(guestIceCandidates)
          })

          console.log({ answer, guestIceCandidates })
        }
      }
    },
    [roomId, CallJoinedSubscriptionQuery]
  )
  useSubscription<HostCallJoinedSubscription>(config)
  useEffect(() => {
    const start = async () => {
      if(!peerConnection || !serverSignal.answer || !serverSignal.guestIceCandidates?.length) return

      const { answer, guestIceCandidates } = serverSignal
      peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)))
      for (const candidate of guestIceCandidates) {
        await peerConnection?.addIceCandidate(JSON.parse(candidate))
      }
    }
    start()
  }, [serverSignal.answer, serverSignal.guestIceCandidates?.length])

  const [callStartCommit] = useMutation<HostCallStartMutation>(graphql`
    mutation HostCallStartMutation($input: CallStartInput!) {
      callStart(input: $input) {
        callRoom {
          id
        }
      }
    }
  `)
  // const [offer, localCandidates] = useLocalSignalling(peerConnection, localStream)

  const [remoteStream, setRemoteStream] = useState<MediaStream>()
  useEffect(() => {
    const start = async () => {
      if(!localStream || !peerConnection) return

      const tracks = localStream?.getTracks()
      tracks?.forEach(track => peerConnection.addTrack(track))

      let offer: RTCSessionDescriptionInit
      const candidates: RTCIceCandidate[] = []
      peerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) candidates.push(event.candidate)
      })
      peerConnection.addEventListener('icegatheringstatechange', event => {
        if(peerConnection.iceGatheringState === 'complete') {
          console.log({ offer, candidates })
          callStartCommit({
            variables: {
              input: {
                roomId,
                offer: JSON.stringify(offer),
                iceCandidates: candidates.map(candidate => JSON.stringify(candidate))
              }
            },
            onCompleted: (res, errors) => {
              if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))
            }
          })
        }
      })
      peerConnection.addEventListener('track', event => {
        const stream = event.streams?.[0] || new MediaStream([event.track])
        setRemoteStream(stream)
      })

      offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
    }
    start()
  }, [localStream?.id])

  useEffect(() => {
    if(!remoteVideoRef.current || !remoteStream) return

    remoteVideoRef.current.srcObject = remoteStream
  }, [Boolean(remoteStream)])

  return (
    <Grid container spacing={2} marginTop={4}>
      <Grid item xs={6} component='video' ref={localVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={remoteVideoRef} autoPlay playsInline height={300} />
    </Grid>
  )
}

export default Host

const CallJoinedSubscriptionQuery = graphql`
  subscription HostCallJoinedSubscription($input: CallJoinedInput!) {
    callJoined(input: $input) {
      callRoom {
        answer
        guestIceCandidates
      }
    }
  }
`
