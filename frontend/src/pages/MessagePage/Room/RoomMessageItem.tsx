import { useAuth } from '../../../providers/auth'
import Message from '../../../common/Message'
import { useFragment, graphql } from 'react-relay'
import { RoomMessageItem_message, RoomMessageItem_message$key } from './__generated__/RoomMessageItem_message.graphql'
import { useMemo } from 'react'

type RoomMessageItemProps = {
  messageRef: RoomMessageItem_message$key
  previousMessage?: RoomMessageItem_message
  nextMessage?: RoomMessageItem_message
}

const RoomMessageItem: React.FC<RoomMessageItemProps> = ({
  messageRef,
  previousMessage,
  nextMessage,
}) => {
  const { id } = useAuth()
  const message = useFragment(
    graphql`
      fragment RoomMessageItem_message on Message {
        id
        content
        author { id avatar }
      }
    `,
    messageRef
  )
  
  const isFirst = previousMessage?.author.id !== message.author.id
  const isPreviousMessageALike = useMemo(() => previousMessage?.content === ':__MESSENGER_LIKE_MESSAGE__:', [previousMessage?.content])
  
  const isLast = nextMessage?.author.id !== message.author.id
  const isNextMessageALike = useMemo(() => nextMessage?.content === ':__MESSENGER_LIKE_MESSAGE__:', [nextMessage?.content])

  return (
    <Message
      key={message.id}
      avatar={message.author.avatar || undefined}
      side={message.author.id === id ? 'right' : 'left'}
      message={message.content}
      first={isFirst || isPreviousMessageALike}
      last={isLast || isNextMessageALike}
    />
  )
}

export default RoomMessageItem
