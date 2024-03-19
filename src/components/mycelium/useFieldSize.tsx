"use client"
import React, { useEffect } from 'react'

export const useFieldSize = () => {
    const [fieldSize, setFieldSize] = React.useState({ width: 0, height: 0 })

    useEffect(() => {
        setFieldSize({
            width: (3 / 5) * window.innerWidth,
            height: (3 / 5) * window.innerHeight
        })

    }, [])

    const refreshFieldSize = () => {
        setFieldSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    return { fieldSize, refreshFieldSize }
}
