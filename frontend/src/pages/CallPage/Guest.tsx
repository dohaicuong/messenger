import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useRef } from 'react'
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
  const offer = data.node?.offer
  const hostIceCandidates = data.node?.hostIceCandidates
  
  const [callJoinCommit] = useMutation<GuestCallJoinMutation>(graphql`
    mutation GuestCallJoinMutation($input: CallJoinInput!) {
      callJoin(input: $input) {
        callRoom {
          id
        }
      }
    }
  `)
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
      })
      peerConnection.addEventListener('track', event => {
        const stream = event.streams?.[0] || new MediaStream([event.track])
        remoteVideoRef.current!.srcObject = stream
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

  return (
    <Grid container spacing={2} marginTop={4}>
      <Grid item xs={6} component='video' ref={localVideoRef} autoPlay playsInline height={300} />
      <Grid item xs={6} component='video' ref={remoteVideoRef} autoPlay playsInline height={300} />
    </Grid>
  )
}

export default Guest
