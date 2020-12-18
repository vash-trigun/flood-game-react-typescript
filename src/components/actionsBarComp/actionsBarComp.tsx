import React from 'react';

import './actionsBarComp.css'

import DropDown from './dropDownComp/dropDownComp';

interface ActionBarPropType {
    clicked: () => void
    changed: (size: string) => void
}

const ActionBar: React.FC<ActionBarPropType> = (props) => {

    const {clicked, changed} = props
    return (
        <div className="bar">
            <button onClick={() => clicked()}>Gerate</button>
            <DropDown changed={changed}/>
        </div>
    )
}

export default ActionBar