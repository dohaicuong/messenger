import { AppBar, Avatar, Chip, IconButton, Toolbar } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Link } from 'react-router-dom'
import logo from '../../favicon.png'
import { useFragment, graphql } from 'react-relay'
import { NavbarFragment_user$key } from './__generated__/NavbarFragment_user.graphql'
import { useState } from 'react'

import NavbarMenu from './NavbarMenu'

type NavbarProps = {
  userRef: NavbarFragment_user$key
}
const Navbar: React.FC<NavbarProps> = ({ userRef }) => {
  const user = useFragment(
    graphql`
      fragment NavbarFragment_user on User {
        firstName
        avatar
      }
    `,
    userRef
  )
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          component={Link}
          to='/app'
        >
          <Avatar src={logo} />
        </IconButton>

        <div style={{ flexGrow: 1 }} />

        <Chip
          avatar={
            <Avatar
              alt={user.firstName}
              src={user.avatar || undefined}
            />
          }
          label={user.firstName}
          sx={{ mr: 1 }}
          onClick={console.log}
        />

        <IconButton
          edge='end'
          color='inherit'
          onClick={handleOpenMenu}
        >
          <ArrowDropDownIcon fontSize='medium' />
        </IconButton>
        <NavbarMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleCloseMenu}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
