import { useAuth } from '../../../providers/auth'
import MessageGroup from '../../../common/MessageGroup'
import { useFragment, graphql } from 'react-relay'
import { RoomMessageItem_message$key } from './__generated__/RoomMessageItem_message.graphql'

type RoomMessageItemProps = {
  messageRef: RoomMessageItem_message$key
}

const RoomMessageItem: React.FC<RoomMessageItemProps> = ({ messageRef }) => {
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
    <MessageGroup
      key={message.id}
      avatar={message.author.avatar || undefined}
      side={message.author.id === id ? 'right' : 'left'}
      messages={[message.content]}
    />
  )
}

export default RoomMessageItem
