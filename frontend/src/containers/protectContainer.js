import React from 'react'
import { Redirect } from 'react-router-dom'

export default function protectContainer(container) {
    const accessString = localStorage.getItem('JWT')

    if (accessString === null) {
        return <Redirect to="/login" />
    } else {
        return container
    }
}
