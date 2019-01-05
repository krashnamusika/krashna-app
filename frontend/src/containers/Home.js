import Button from '@material-ui/core/es/Button/Button'
import React from 'react'

export default () => (
    <p>
        Protected stuff
        <Button
            onClick={() => {
                localStorage.removeItem('JWT')
                window.location.href = '/login'
            }}
        >
            Logout
        </Button>
    </p>
)
