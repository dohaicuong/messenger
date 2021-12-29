import { AddCircle, EmojiEmotions, Gif, PermMedia, PhotoLibrary, ThumbUp } from '@mui/icons-material'
import { IconButton, InputAdornment, Toolbar } from '@mui/material'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '../../../common/TextField'
import { useMutation, graphql } from 'react-relay'
import { MessageSendInput, RoomChatBoxSendMessageMutation } from './__generated__/RoomChatBoxSendMessageMutation.graphql'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useRef } from 'react'

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

  const methods = useForm<Omit<MessageSendInput, 'roomId'>>()
  const contentInputRef = useRef<HTMLDivElement | null>(null)
  const { ref, ...rest } = methods.register('content')

  const onSubmit: SubmitHandler<Omit<MessageSendInput, 'roomId'>> = data => {
    sendMessageCommit({
      variables: {
        input: {
          content: data.content,
          roomId: id
        },
        connections: [
          `client:${id}:__RoomMessageList_room_messages_connection`
        ]
      },
      onCompleted: (res, errors) => {
        if (errors?.length) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        methods.reset()
        // console.log(contentInputRef.current)
        // contentInputRef.current?.focus?.()
      }
    })
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
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton disabled>
                    <EmojiEmotions />
                  </IconButton>
                </InputAdornment>
              )
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

      <IconButton disabled>
        <ThumbUp />
      </IconButton>
    </Toolbar>
  )
}

export default RoomChatBox
