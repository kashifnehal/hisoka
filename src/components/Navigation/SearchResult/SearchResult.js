import React from 'react'

const searchResult = (props) => {
    return(
        <div>
            hello
            {props.searchData.map(i => <p>{i}</p>)}
        </div>
    )
}

export default searchResult