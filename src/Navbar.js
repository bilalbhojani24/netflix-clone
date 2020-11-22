import React, { useEffect, useState } from 'react'


function Navbar() {

    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            }
            else {
                handleShow(false)
            }
        });
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])
    return (
        <div className={`nav ${show && "nav_blank"}`}>
            <img className="nav_logo" src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="netflix logo" />
            <img className="nav_avatar" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="netflix logo" />
        </div>
    )
}

export default Navbar
