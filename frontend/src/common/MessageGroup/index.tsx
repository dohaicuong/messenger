import { Avatar, Grid, styled, Typography } from '@mui/material'

type MessageGroupProps = {
  avatar?: string
  messages: string[]
  side: 'left' | 'right'
}

const MessageGroup: React.FC<MessageGroupProps> = ({ avatar, messages, side }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
    >
      {side === 'left' && (
        <Grid item>
          <MessageGroupAvatar src={avatar} />
        </Grid>
      )}
      <Grid item xs={8}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: side === 'right' ? 'flex-end' : 'flex-start'
            }}
          >
            {side === 'left'
              ? (
                <MessageGroupMessageLeft>
                  {message}
                </MessageGroupMessageLeft>
              )
              : (
                <MessageGroupMessageRight>
                  {message}
                </MessageGroupMessageRight>
              )
            }
          </div>
        ))}
      </Grid>
    </Grid>
  )
}

export default MessageGroup

const MessageGroupAvatar = styled(Avatar)(({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
`)

const MessageGroupMessage = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(1, 2)};
  border-radius: 4px;
  margin-bottom: 4px;
  display: 'inline-block';
  word-break: 'break-word';
  font-size: 14px;
`)

const MessageGroupMessageLeft = styled(MessageGroupMessage)(({ theme }) => `
  border-top-right-radius: ${theme.spacing(2.5)};
  border-bottom-right-radius: ${theme.spacing(2.5)};
  background-color: ${theme.palette.grey[800]};
`)

const MessageGroupMessageRight = styled(MessageGroupMessage)(({ theme }) => `
  margin-right: 12px;
  border-top-left-radius: ${theme.spacing(2.5)};
  border-bottom-left-radius: ${theme.spacing(2.5)};
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
`)