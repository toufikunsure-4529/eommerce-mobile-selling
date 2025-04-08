"use client"
import confetti from "canvas-confetti";
import { useEffect } from "react"

function SuccessMessage() {
    useEffect(() => {
        confetti();
    }, [])
    return (
        <>

        </>
    )
}

export default SuccessMessage