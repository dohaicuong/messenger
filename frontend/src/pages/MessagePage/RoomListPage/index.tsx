import { Divider, Grid } from "@mui/material"
import { useLazyLoadQuery, graphql } from "react-relay"
import { Outlet } from "react-router-dom"
import RoomList from "./RoomList"
import { RoomListPageQuery } from "./__generated__/RoomListPageQuery.graphql"

const RoomListPage = () => {
  const data = useLazyLoadQuery<RoomListPageQuery>(
    graphql`
      query RoomListPageQuery {
        me {
          ...RoomList_me
        }
      }
    `,
    {}
  )

  if (!data.me) return null

  return (
    <Grid container height='calc(100vh - 64px)'>
      <Grid item xs='auto'>
        <RoomList meRef={data.me} />
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item xs>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default RoomListPage
