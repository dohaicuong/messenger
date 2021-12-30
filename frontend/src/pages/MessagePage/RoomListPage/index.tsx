import { CircularProgress, Divider, Grid } from "@mui/material"
import { ChangeEvent, Suspense, useState } from 'react'
import { useLazyLoadQuery, graphql } from "react-relay"
import { Outlet } from "react-router-dom"
import RoomList from "./RoomList"
import { RoomListPageQuery } from "./__generated__/RoomListPageQuery.graphql"

import { InputAdornment, TextField } from "@mui/material"
import { Search } from '@mui/icons-material'
import RoomListHeader from "./RoomListHeader"

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

  const [searchTerm, setSearchTerm] = useState<string>()
  const handleSearchRooms = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (!data.me) return null

  return (
    <Grid container height='calc(100vh - 64px)'>
      <Grid item xs='auto'>
        <RoomListHeader />

        <div style={{ margin: '8px 16px' }}>
          <TextField
            value={searchTerm}
            onChange={handleSearchRooms}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
            autoComplete='off'
            placeholder='Search Messenger'
            fullWidth
          />
        </div>

        <Suspense fallback={<LoadingCircle />}>
          <RoomList meRef={data.me} searchTerm={searchTerm} />
        </Suspense>
      </Grid>
      <Divider orientation='vertical' flexItem />
      <Grid item xs>
        <Suspense fallback={<LoadingCircle />}>
          <Outlet />
        </Suspense>
      </Grid>
    </Grid>
  )
}

export default RoomListPage

const LoadingCircle = () => (
  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </div>
)