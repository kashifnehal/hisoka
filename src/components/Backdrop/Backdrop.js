import React from 'react'
import classes from './Backdrop.css'

const backdrop = (props) => {
    // console.log('in backdrop')
    // console.log(props.show)
    return (
        props.show ? <div className={classes.Backdrop} onClick={props.closeback}></div> : null
    )
}

export default backdrop