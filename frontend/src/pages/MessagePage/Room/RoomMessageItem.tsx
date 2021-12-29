import { useAuth } from '../../../providers/auth'
import Message from '../../../common/Message'
import { useFragment, graphql } from 'react-relay'
import { RoomMessageItem_message$key } from './__generated__/RoomMessageItem_message.graphql'

type RoomMessageItemProps = {
  messageRef: RoomMessageItem_message$key
  previousMessageAuthorId?: string
  nextMessageAuthorId?: string
}

const RoomMessageItem: React.FC<RoomMessageItemProps> = ({
  messageRef,
  previousMessageAuthorId,
  nextMessageAuthorId,
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

  return (
    <Message
      key={message.id}
      avatar={message.author.avatar || undefined}
      side={message.author.id === id ? 'right' : 'left'}
      message={message.content}
      first={previousMessageAuthorId !== message.author.id}
      last={nextMessageAuthorId !== message.author.id}
    />
  )
}

export default RoomMessageItem
