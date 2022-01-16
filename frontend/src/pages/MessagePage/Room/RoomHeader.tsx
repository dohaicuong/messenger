import { Call, Info, Videocam } from '@mui/icons-material'
import { IconButton, Toolbar, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useFragment, graphql, useMutation } from 'react-relay'
import { useNavigate } from 'react-router-dom'
import { RoomHeaderCallRoomCreateMutation } from './__generated__/RoomHeaderCallRoomCreateMutation.graphql'
import { RoomHeader_room$key } from './__generated__/RoomHeader_room.graphql'

type RoomHeaderProps = {
  roomRef: RoomHeader_room$key
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ roomRef }) => {
  const room = useFragment(
    graphql`
      fragment RoomHeader_room on Room {
        name
        participants {
          id
        }
      }
    `,
    roomRef
  )

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [createCallRoomCommit] = useMutation<RoomHeaderCallRoomCreateMutation>(graphql`
    mutation RoomHeaderCallRoomCreateMutation($input: CallRoomCreateInput!) {
      callRoomCreate(input: $input) {
        callRoom {
          id
        }
      }
    }
  `)

  const handleVideoCall = () => {
    createCallRoomCommit({
      variables: {
        input: {
          guestId: room.participants[0].id
        }
      },
      onCompleted: (res, errors) => {
        if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        navigate(`/app/call/host/${res.callRoomCreate?.callRoom?.id}`)
      }
    })
  }

  return (
    <Toolbar>
      <Typography variant='h6'>{room.name}</Typography>
      <div style={{ flexGrow: 1 }} />
      <IconButton color='primary' disabled>
        <Call />
      </IconButton>
      <IconButton color='primary' onClick={handleVideoCall}>
        <Videocam />
      </IconButton>
      <IconButton color='primary' disabled>
        <Info />
      </IconButton>
    </Toolbar>
  )
}

export default RoomHeader
