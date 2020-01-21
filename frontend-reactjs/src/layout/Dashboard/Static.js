import React from 'react'

 function Static(props) {
    return (
        <div className={`card ${props.color}`}>
        <div className="card-content">
          <div className="d-flex no-block align-items-center">
            <div className="m-l-15">
              <h5 className="white-text">{props.headline}</h5>
              <h6 className="white-text m-b-0">{props.static}</h6>
            </div>
          </div>
        </div>
      </div>
)
}

export default Static