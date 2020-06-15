import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const searchResult = (props) => {

    console.log(props.searchData)
    const res = Object.keys(props.searchData)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span>{props.searchData[igKey]}</span>
                </li>
            )
        })
    console.log(res)
    return(
        <Auxiliary>
            <ul>
                {res}
            </ul>
        </Auxiliary>
    )
}

export default searchResult