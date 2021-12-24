import { ThemeProvider as MuiThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { theme } from './theme'

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
