import React from 'react'

 function Error(props) {
    return (
            <span className="helper-text red-text" >{props.children}</span> 
        )
}

export default Error