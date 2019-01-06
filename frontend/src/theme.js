import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
    palette: {
        primary: {
            main: '#cc0000',
        },
        secondary: {
            main: '#ffd700',
        },
    },
    typography: {
        fontFamily: ['Raleway', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
            ','
        ),
        useNextVariants: true,
    },
})
