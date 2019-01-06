import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App'
import './index.css'
import theme from './theme'

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
