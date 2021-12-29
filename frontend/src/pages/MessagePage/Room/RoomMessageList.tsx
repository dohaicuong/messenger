import { styled, Typography } from '@mui/material'
import { usePaginationFragment, graphql, useSubscription } from 'react-relay'
import RoomMessageItem from './RoomMessageItem'
import { LoadingButton } from '@mui/lab'
import { RoomMessageList_room$key } from './__generated__/RoomMessageList_room.graphql'
import { RoomMessageListPaginationQuery } from './__generated__/RoomMessageListPaginationQuery.graphql'
import { useEffect, useMemo, useRef, useState } from 'react'
import { RoomMessageListSubscription } from './__generated__/RoomMessageListSubscription.graphql'
import { useParams } from 'react-router-dom'

type RoomMessageListProps = {
  roomRef: RoomMessageList_room$key
}

const MessageSentSubscription = graphql`
  subscription RoomMessageListSubscription(
    $input: MessageSentInput!
    $connections: [ID!]!
  )
  {
    messageSent(input: $input) {
      message
      @appendNode(
        edgeTypeName: "MessageEdge"
        connections: $connections
      )
      {
        ...RoomMessageItem_message
      }
    }
  }
`
const RoomMessageList: React.FC<RoomMessageListProps> = ({ roomRef }) => {
  const { id } = useParams()

  const { data, hasPrevious, isLoadingPrevious, loadPrevious } = usePaginationFragment<RoomMessageListPaginationQuery, RoomMessageList_room$key>(
    graphql`
      fragment RoomMessageList_room on Room
      @refetchable(queryName: "RoomMessageListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
      )
      {
        id
        messages(last: $count, before: $cursor)
        @connection(key: "RoomMessageList_room_messages")
        {
          edges {
            node {
              id
              author { id }
              content
              ...RoomMessageItem_message
            }
          }
        }
      }
    `,
    roomRef
  )

  const [isLoadMore, setIsLoadMore] = useState(false)
  const handleLoadMore = () => {
    setIsLoadMore(true)
    loadPrevious(10)
  }
  
  const config = useMemo(
    () => ({
      subscription: MessageSentSubscription,
      variables: { 
        input: {
          roomId: id
        },
        connections: [
          `client:${id}:__RoomMessageList_room_messages_connection`
        ]  
      },
    }),
    [id]
  )
  useSubscription<RoomMessageListSubscription>(config)

  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (isLoadMore) return setIsLoadMore(false)

    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [data.messages.edges?.length])

  return (
    <RoomMessageBoxContainer>
      {!Boolean(data.messages.edges?.length) && (
        <Typography variant='h5' textAlign='center' style={{ marginTop: 24 }}>
          start talking to each others
        </Typography>
      )}

      {hasPrevious && (
        <LoadingButton fullWidth loading={isLoadingPrevious} onClick={handleLoadMore}>
          Load more
        </LoadingButton>
      )}

      {data.messages.edges?.map((edge, index, edges) => {
        if(!edge?.node) return

        return (
          <RoomMessageItem
            key={edge.node.id}
            messageRef={edge.node}
            previousMessage={edges[index - 1]?.node as any}
            nextMessage={edges[index + 1]?.node as any}
          />
        )
      })}

      <div ref={bottomRef} />
    </RoomMessageBoxContainer>
  )
}

export default RoomMessageList

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