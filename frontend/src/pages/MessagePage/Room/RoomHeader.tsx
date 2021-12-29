import { Call, Info, Videocam } from '@mui/icons-material'
import { IconButton, Toolbar, Typography } from '@mui/material'
import { useFragment, graphql } from 'react-relay'
import { RoomHeader_room$key } from './__generated__/RoomHeader_room.graphql'

type RoomHeaderProps = {
  roomRef: RoomHeader_room$key
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ roomRef }) => {
  const room = useFragment(
    graphql`
      fragment RoomHeader_room on Room {
        name
      }
    `,
    roomRef
  )

  return (
    <Toolbar>
      <Typography variant='h6'>{room.name}</Typography>
      <div style={{ flexGrow: 1 }} />
      <IconButton color='primary' disabled>
        <Call />
      </IconButton>
      <IconButton color='primary' disabled>
        <Videocam />
      </IconButton>
      <IconButton color='primary' disabled>
        <Info />
      </IconButton>
    </Toolbar>
  )
}

export default RoomHeader
