import { Button, InputAdornment, List, styled, TextField } from "@mui/material"
import { LoadingButton } from '@mui/lab'
import { Search } from '@mui/icons-material'
import { usePaginationFragment, graphql } from "react-relay"
import { RoomList_me$key } from "./__generated__/RoomList_me.graphql"
import RoomItem from "./RoomItem"
import RoomListHeader from "./RoomListHeader"
import { useMatch, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

type RoomListProps = {
  meRef: RoomList_me$key
}

const RoomList: React.FC<RoomListProps> = ({ meRef }) => {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment(
    graphql`
      fragment RoomList_me on User
      @refetchable(queryName: "RoomListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
      )
      {
        rooms (first: $count, after: $cursor)
        @connection(key: "RoomList_me_rooms")
        {
          edges {
            node {
              id
              ...RoomItem_room
            }
          }
        }
      }
    `,
    meRef
  )
  const handleLoadMore = () => loadNext(10)

  const match = useMatch('/app/messages')
  const navigate = useNavigate()
  const firstRoomId = data.rooms.edges?.[0]?.node?.id
  useEffect(() => {
    if (match?.pathname && firstRoomId) navigate(firstRoomId)
  }, [match?.pathname, firstRoomId])

  return (
    <>
      <RoomListHeader />

      <div style={{ margin: '8px 16px' }}>
        <TextField
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
          disabled
        />
      </div>

      <StyledList>
        {data.rooms.edges?.map(edge => {
          if (edge?.node?.id) return <RoomItem key={edge.node.id} roomRef={edge.node} />
        })}
        {hasNext && (
          <LoadingButton fullWidth loading={isLoadingNext} onClick={handleLoadMore}>
            Load more
          </LoadingButton>
        )}
      </StyledList>
    </>
  )
}

export default RoomList

const StyledList = styled('div')(({ theme }) => `
  width: 360px;
  height: calc(100vh - 64px - 64px - 56px - 16px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${theme.palette.grey[800]};
    transition: background 0.5s ease-in-out;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[700]};
    transition: background 0.5s ease-in-out;
  }
`)