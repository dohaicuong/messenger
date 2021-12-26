import { IconButton, Toolbar, Typography } from "@mui/material"
import { MoreVert, VideoCall, Create } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"

const RoomListHeader = () => {
  const navigate = useNavigate()
  const handleNewRoom = () => navigate('new')

  return (
    <Toolbar>
      <Typography variant='h5'>
        Chat
      </Typography>

      <div style={{ flexGrow: 1 }} />

      <IconButton>
        <MoreVert />
      </IconButton>
      <IconButton>
        <VideoCall />
      </IconButton>
      <IconButton onClick={handleNewRoom}>
        <Create />
      </IconButton>
    </Toolbar>
  )
}

export default RoomListHeader
