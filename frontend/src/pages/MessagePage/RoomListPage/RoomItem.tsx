import { Avatar, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material'
import { useFragment, graphql } from 'react-relay'
import { useNavigate, useParams } from 'react-router-dom'
import { RoomItem_room$key } from './__generated__/RoomItem_room.graphql'

type RoomItemProps = {
  roomRef: RoomItem_room$key
}

const RoomItem: React.FC<RoomItemProps> = ({ roomRef }) => {
  const { id } = useParams()
  const room = useFragment(
    graphql`
      fragment RoomItem_room on Room {
        id
        name
      }
    `,
    roomRef
  )
  
  const navigate = useNavigate()
  const handleRoomClick = () => {
    navigate(`${room.id}`)
  }

  return (
    <ListItem button selected={room.id === id} onClick={handleRoomClick}>
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText
        primary={room.name}
      />
    </ListItem>
  )
}

export default RoomItem
