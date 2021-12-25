import { ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useAuth } from '../../providers/auth'

type NavbarMenuProps = {
  anchorEl: HTMLElement | null
  open: boolean
  handleClose: () => void
}
const NavbarMenu: React.FC<NavbarMenuProps> = ({ anchorEl, open, handleClose }) => {
  const { signout } = useAuth()
  const handleLogout = () => {
    signout()
    handleClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary='Log Out' />
      </ListItem>
    </Menu>
  )
}

export default NavbarMenu
