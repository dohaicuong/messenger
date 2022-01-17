import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useLazyLoadQuery, graphql, useMutation } from 'react-relay'
import { useParams } from 'react-router-dom'
import { usePeerConnection } from './usePeerConnection'
import { useRemoteStream } from './useRemoteStream'
import { useStreamToVideo } from './useStreamToVideo'
import { useUserMedia } from './useUserMedia'
import { GuestCallJoinMutation } from './__generated__/GuestCallJoinMutation.graphql'
import { GuestCallRoomQuery } from './__generated__/GuestCallRoomQuery.graphql'

const Guest = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  const [peerConnection] = usePeerConnection({ iceServers: [{'urls': 'stun:stun.l.google.com:19302'}] })
  const [localStream] = useUserMedia({ video: true, audio: false })
  useStreamToVideo(localVideoRef.current, localStream)

  const [callJoinCommit] = useMutation<GuestCallJoinMutation>(graphql`
    mutation GuestCallJoinMutation($input: CallJoinInput!) {
      callJoin(input: $input) {
        callRoom {
          id
        }
      }
    }
  `)
  const [offer, hostIceCandidates] = useRoomOffer(roomId)
  const [remoteStream] = useGuestSignalling(
    peerConnection, localStream, offer, hostIceCandidates,
    ({ answer, candidates }) => {
      callJoinCommit({
        variables: {
          input: {
            roomId,
            answer: JSON.stringify(answer),
            iceCandidates: candidates.map(candidate => JSON.stringify(candidate))
          }
        },
        onCompleted: (res, errors) => {
          console.log(res, errors)
          if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

          console.log(res.callJoin?.callRoom)
        }
      })
    }
  )
  useStreamToVideo(remoteVideoRef.current, remoteStream)
  
  return (
    <Grid container spacing={2} marginTop={4}>
      <Grid item xs={6} component='video' ref={localVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={remoteVideoRef} autoPlay playsInline height={300} />
    </Grid>
  )
}

export default Guest

const useRoomOffer = (roomId?: string): [string | undefined, string[] | undefined] => {
  const data = useLazyLoadQuery<GuestCallRoomQuery>(
    graphql`
      query GuestCallRoomQuery($id: ID!) {
        node(id: $id) {
          ... on CallRoom {
            offer
            hostIceCandidates
          }
        }
      }
    `,
    { id: roomId || '' }
  )
  const offer = data.node?.offer || undefined
  const hostIceCandidates = data.node?.hostIceCandidates ? Array.from(data.node?.hostIceCandidates) : undefined

  return [offer, hostIceCandidates]
}

const useGuestSignalling = (
  peerConnection?: RTCPeerConnection,
  localStream?: MediaStream,
  offer?: string,
  hostIceCandidates?: string[],
  onDoneGather?: (payload: { answer: RTCSessionDescriptionInit, candidates: RTCIceCandidate[] }) => void,
  onRemoteStream?: (stream?: MediaStream) => void,
) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream>()

  useEffect(() => {
    const start = async () => {
      if (!peerConnection || !offer || !hostIceCandidates?.length || !localStream) return

      const tracks = localStream.getTracks()
      tracks.forEach(track => peerConnection.addTrack(track))

      let answer: RTCSessionDescriptionInit
      const candidates: RTCIceCandidate[] = []
      peerConnection.addEventListener('icecandidate', event => {
        if(event.candidate) candidates.push(event.candidate)
      })
      peerConnection.addEventListener('icegatheringstatechange', async event => {
        if(peerConnection.iceGatheringState === 'complete') {
          onDoneGather?.({ answer, candidates })
        }
      })
      peerConnection.addEventListener('track', event => {
        const stream = event.streams?.[0] || new MediaStream([event.track])
        onRemoteStream?.(stream)
        setRemoteStream(stream)
      })

      await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)))

      answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)

      for (const candidate of hostIceCandidates) {
        await peerConnection.addIceCandidate(JSON.parse(candidate))
      }
    }
    start()
  }, [offer, localStream?.id])

  return [remoteStream]
}