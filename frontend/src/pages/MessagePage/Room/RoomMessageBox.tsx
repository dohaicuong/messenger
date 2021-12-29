import { styled, Typography } from '@mui/material'
import { usePaginationFragment, graphql } from 'react-relay'
import { RoomMessageBoxPaginationQuery } from './__generated__/RoomMessageBoxPaginationQuery.graphql'
import { RoomMessageBox_room$key } from './__generated__/RoomMessageBox_room.graphql'
import RoomMessageItem from './RoomMessageItem'
import { LoadingButton } from '@mui/lab'

type RoomMessageBoxProps = {
  roomRef: RoomMessageBox_room$key
}

const RoomMessageBox: React.FC<RoomMessageBoxProps> = ({ roomRef }) => {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<RoomMessageBoxPaginationQuery, RoomMessageBox_room$key>(
    graphql`
      fragment RoomMessageBox_room on Room
      @refetchable(queryName: "RoomMessageBoxPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
      )
      {
        messages(first: $count, after: $cursor)
        @connection(key: "RoomMessageBox_room_messages")
        {
          edges {
            node {
              id
              ...RoomMessageItem_message
            }
          }
        }
      }
    `,
    roomRef
  )
  const handleLoadMore = () => loadNext(10)

  return (
    <RoomMessageBoxContainer>
      {!Boolean(data.messages.edges?.length) && (
        <Typography variant='h5' textAlign='center' style={{ marginTop: 24 }}>
          start talking to each others
        </Typography>
      )}

      {data.messages.edges?.map(edge => {
        if(!edge?.node) return

        return <RoomMessageItem key={edge.node.id} messageRef={edge.node} />
      })}

      {hasNext && (
        <LoadingButton fullWidth loading={isLoadingNext} onClick={handleLoadMore}>
          Load more
        </LoadingButton>
      )}
    </RoomMessageBoxContainer>
  )
}

export default RoomMessageBox

const RoomMessageBoxContainer = styled('div')(({ theme }) => `
  height: calc(100vh - 64px - 65px - 56px - 33px);
  overflow-y: auto;
  margin: 16px 16px;
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 8px;
    display: none
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${theme.palette.background.paper};
    transition: background 0.5s ease-in-out;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[800]};
    transition: background 0.5s ease-in-out;
  }
`)