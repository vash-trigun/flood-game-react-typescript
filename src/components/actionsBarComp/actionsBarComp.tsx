import React from 'react';
import PropTypes from  'prop-types'
import './actionsBarComp.css'

interface ActionBarPropType {
    clicked: () => void
}

const ActionBar: React.FC<ActionBarPropType> = (props) => {

    const {clicked} = props
    return (
        <div className="bar">
            <button onClick={() => clicked()}>Gerate</button>
        </div>
    )
}

export default ActionBar