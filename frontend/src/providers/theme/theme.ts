import { createTheme } from '@mui/material'
import { orange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5865f2'
    }
  },
  status: {
    danger: orange[500],
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 30px #1e1e1e inset !important',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
      }
    }
  }
})

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }

  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}
