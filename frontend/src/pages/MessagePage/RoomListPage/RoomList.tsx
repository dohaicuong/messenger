import { InputAdornment, List, TextField } from "@mui/material"
import { Search } from '@mui/icons-material'
import { usePaginationFragment, graphql } from "react-relay"
import { RoomList_me$key } from "./__generated__/RoomList_me.graphql"
import RoomItem from "./RoomItem"
import RoomListHeader from "./RoomListHeader"

type RoomListProps = {
  meRef: RoomList_me$key
}

const RoomList: React.FC<RoomListProps> = ({ meRef }) => {
  const { data } = usePaginationFragment(
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
            }
          }
        }
      }
    `,
    meRef
  )
  console.log(data)

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
          placeholder='Search Messenger'
          fullWidth
        />
      </div>

      <List style={{ width: 360 }}>
        {data.rooms.edges?.map(edge => {
          if (edge?.node?.id) return <RoomItem key={edge.node.id} />
        })}
      </List>
    </>
  )
}

export default RoomList
