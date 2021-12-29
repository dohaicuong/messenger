import { useState } from 'react'
import { EmojiEmotions } from '@mui/icons-material'
import { ClickAwayListener, IconButton, InputAdornment } from '@mui/material'

import { Picker, EmojiData } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

type EmojiButtonProps = {
  onSelect?: (emoji: EmojiData) => void
}

const EmojiButton: React.FC<EmojiButtonProps> = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false)
  
  const handleToggle = () => setShowPicker(pre => !pre)
  const handleClose = () => setShowPicker(false)

  const handleSelect = (emoji: EmojiData) => {
    onSelect?.(emoji)
    handleClose()
  }
  
  return (
    <>
      <InputAdornment position='end'>
        <IconButton onClick={handleToggle}>
          <EmojiEmotions />
        </IconButton>
      </InputAdornment>
      {showPicker && (
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Picker
              onSelect={handleSelect}
              theme='dark'
              native
              showPreview={false}
              showSkinTones={false}
              style={{
                position: 'absolute',
                bottom: 58,
                right: 0,
                zIndex: 1,
              }}
            />
          </div>
        </ClickAwayListener>
      )}
    </>
  )
}

export default EmojiButton
