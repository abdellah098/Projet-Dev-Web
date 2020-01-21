import React from 'react'
import Static from "./Static"
 function Statistics() {
    return (
        <React.Fragment>
            <div className="col l4 s12 m4">
                <Static color="blue-grey darken-4" headline="Total Courses" static="17 courses" />
            </div>
            <div className="col l4 s6 m4">
            <Static color="blue" headline="Enrolled Students" static="63 students" />
            </div>
            <div className="col l4 s6 m4">
            <Static color="orange" headline="Average Rating" static="4.5/5 stars" />
            </div>

        </React.Fragment>
        )
}

export default Statistics