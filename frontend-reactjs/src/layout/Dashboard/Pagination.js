import React from 'react'

function Pagination(props) {
    let lis=[]
    let i = props.page <=3 ? 1 : props.page - 3
    let j = props.pages - props.page < 3 ? props.pages - props.page : 3

    for( i ; i<=props.page+j ; i++){
        lis.push(
            <li key={i} className={props.page===i ? "active" : "waves-effect" } onClick={props.handlePageClick.bind(this,i)}><a href="#!" >{i}</a></li>
        )    
    }

    return (
      <ul className="pagination center" >
            <li className="waves-effect" onClick={props.handlePageClick.bind(this, props.page-1)} ><a href="#!"  ><i className="material-icons">chevron_left</i></a></li>
            {lis}
            <li className="waves-effect"  onClick={props.handlePageClick.bind(this, props.page+1)}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
)
}

export default Pagination

/*    if(props.pages-2===props.page){
        i= props.page - 4 > 0 
        j=2
    }else if(props.pages-1===props.page){
        i= props.page - 5
        j=1

    }
    else if(props.pages===props.page){
        i= props.page - 6
        j=0

    }else{
        i =  props.page <=3 ? 1 : props.page - 3
        j=3
    }
    i = i > 0 ? i : 1
    j = j <= 2 ? props.pages : j
*/