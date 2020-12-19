import React, {useState} from 'react'

import './DropDownComp.css'

import {IDropDownCompProps} from '../../../shared/interfaces'

const DropDownComp: React.FC<IDropDownCompProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const {changed} = props

    const openCloseHandler = () => {
        setIsOpen(prevState => !prevState)
    }


    window.onclick = (e: Event) => {
        if(isOpen) {
            openCloseHandler()
        }
    }

    return (
        <>
        <button onClick={(e) => { e.stopPropagation(); openCloseHandler()}} className="dropdownButton">Change Size
            {isOpen ? 
            <div className="dropdownContent">
                <div onClick={() => changed("s")} className="dropdownItem">10 x 10</div>
                <div onClick={() => changed("m")} className="dropdownItem">17 x 17</div>
                <div onClick={() => changed("l")} className="dropdownItem">50 x 17</div>
            </div>
            : null}
        </button>
        </>
    )
}

export default DropDownComp