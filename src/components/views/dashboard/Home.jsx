import React, { useEffect } from 'react'
import { Navbar } from "./../../shared/mollecules/Navbar"
export const Home = () => {

    // remove backdrop from modal if exists.
    useEffect(() => {
        const modalBackgroundArray = document.getElementsByClassName("modal-backdrop fade show")
        if (modalBackgroundArray && modalBackgroundArray.length > 0) {
            modalBackgroundArray[0].remove();
        }
    }, [])


    return (
        <div>
            <Navbar></Navbar>
        </div>
    )
}
