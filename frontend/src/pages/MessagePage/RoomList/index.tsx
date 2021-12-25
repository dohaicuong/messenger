import { Grid, List } from "@mui/material"
import { Outlet } from "react-router-dom"

const RoomList = () => {
  return (
    <Grid container>
      <Grid item xs='auto'>
        <List style={{ width: 360 }}>
          Room list
        </List>
      </Grid>
      <Grid item xs>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default RoomList
