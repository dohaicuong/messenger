import { AddCircle, Gif, PermMedia, PhotoLibrary, ThumbUp } from '@mui/icons-material'
import { IconButton, Toolbar } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../../../common/TextField'
import { useMutation, graphql } from 'react-relay'
import { MessageSendInput, RoomChatBoxSendMessageMutation } from './__generated__/RoomChatBoxSendMessageMutation.graphql'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useRef } from 'react'

import EmojiButton from './EmojiButton'
import { EmojiData } from 'emoji-mart'

const RoomChatBox = () => {
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const [sendMessageCommit, isSendingMessage] = useMutation<RoomChatBoxSendMessageMutation>(graphql`
    mutation RoomChatBoxSendMessageMutation($input: MessageSendInput!, $connections: [ID!]!) {
      messageSend(input: $input) {
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
  `)
  const sendMessage = (content: string, cb?: () => void) => {
    sendMessageCommit({
      variables: {
        input: {
          content: content,
          roomId: id
        },
        connections: [
          `client:${id}:__RoomMessageList_room_messages_connection`
        ]
      },
      onCompleted: (res, errors) => {
        if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        cb?.()
        // console.log(contentInputRef.current)
        // contentInputRef.current?.focus?.()
      }
    })
  }

  const methods = useForm<Omit<MessageSendInput, 'roomId'>>()
  const contentInputRef = useRef<HTMLDivElement | null>(null)
  const { ref, ...rest } = methods.register('content')

  const contentValue = methods.watch('content')
  const onSelectEmoji = (emoji: EmojiData) => {
    methods.setValue('content', `${contentValue || ''}${(emoji as any).native}`)
  }

  const onSubmit: SubmitHandler<Omit<MessageSendInput, 'roomId'>> = data => {
    sendMessage(data.content, methods.reset)
  }

  const handleLikeButton = () => {
    sendMessage(':__MESSENGER_LIKE_MESSAGE__:')
  }

  return (
    <Toolbar variant='dense' style={{ paddingLeft: 4, paddingRight: 4 }}>
      <IconButton disabled>
        <AddCircle />
      </IconButton>
      <IconButton disabled>
        <PhotoLibrary />
      </IconButton>
      <IconButton disabled>
        <PermMedia />
      </IconButton>
      <IconButton disabled>
        <Gif />
      </IconButton>
      
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ flexGrow: 1, marginLeft: 4, marginRight: 4 }}
        >
          <TextField
            placeholder='Aa'
            InputProps={{
              endAdornment: <EmojiButton onSelect={onSelectEmoji} />
            }}
            autoComplete='off'
            fullWidth
            autoFocus
            // disabled={isSendingMessage}
            {...rest}
            inputRef={e => {
              ref(e)
              contentInputRef.current = e
            }}
          />
        </form>
      </FormProvider>

      <IconButton onClick={handleLikeButton}>
        <ThumbUp />
      </IconButton>
    </Toolbar>
  )
}

export default RoomChatBox
