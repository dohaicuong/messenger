import { Avatar, Grid, styled, Typography } from '@mui/material'
import clsx from 'clsx'
import { useMemo } from 'react'
import Like from '../Like'

type MessageProps = {
  avatar?: string
  message: string
  side: 'left' | 'right'
  first?: boolean
  last?: boolean
}

const Message: React.FC<MessageProps> = ({
  avatar,
  message,
  side,
  first,
  last
}) => {
  const isLikeMessage = useMemo(() => message === ':__MESSENGER_LIKE_MESSAGE__:', [message])

  return (
    <Grid
      container
      spacing={2}
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
    >
      {side === 'left' && (
        <Grid
          item
          display='flex'
          alignItems={isLikeMessage ? 'flex-end' : 'flex-start'}
        >
          <MessageAvatar src={avatar} />
        </Grid>
      )}
      <Grid item xs={8}>
        <div
          style={{
            display: 'flex',
            justifyContent: side === 'right' ? 'flex-end' : 'flex-start'
          }}
        >
          {isLikeMessage
            ? (
              <div style={{ height: 56, width: 56 }}>
                <Like />
              </div>
            )
            : (
              <MessageContent
                className={clsx(side, {
                  [`first_${side}`]: first,
                  [`last_${side}`]: last,
                })}
              >
                {message}
              </MessageContent>
            )
          }
        </div>
      </Grid>
    </Grid>
  )
}

export default Message

const MessageAvatar = styled(Avatar)(({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
`)

const MessageContent = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(1, 2)};
  border-radius: 4px;
  margin-bottom: 4px;
  display: 'inline-block';
  word-break: 'break-word';
  font-size: 14px;

  &.left {
    border-top-right-radius: ${theme.spacing(2.5)};
    border-bottom-right-radius: ${theme.spacing(2.5)};
    background-color: ${theme.palette.grey[800]};
  }
  &.first_left {
    border-top-left-radius: ${theme.spacing(2.5)};
  }
  &.last_left {
    border-bottom-left-radius: ${theme.spacing(2.5)};
  }

  &.right {
    margin-right: 12px;
    border-top-left-radius: ${theme.spacing(2.5)};
    border-bottom-left-radius: ${theme.spacing(2.5)};
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
  }
  &.first_right {
    border-top-right-radius: ${theme.spacing(2.5)};
  }
  &.last_right {
    border-bottom-right-radius: ${theme.spacing(2.5)};
  }
`)
