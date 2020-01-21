import React from 'react'

 function DescGrid(props) {
    return (
        <React.Fragment>
        <div className="card center">
        <div className="card-content">
            <img src={props.img} alt="" />
            <h5>{props.headline}</h5>
            <p>{props.description}</p>
        </div>
        </div>
    </React.Fragment>
    )
}
export default DescGrid