import React, { Component } from 'react';
import classes from './Modal.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../../components/Backdrop/Backdrop'

class Modal extends Component {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    // componentWillUpdate () {
    //     console.log('[Modal] WillUpdate');
    // }

    render () {
        // console.log('in modal')
        // console.log(this.props.clicked)
        return (
            <Auxiliary>
                <Backdrop show={this.props.clicked} closeback={this.props.canceled}/>
                <div
                    className={classes.Modal}
                    style={{
                        // transform: this.props.clicked ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.clicked ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default Modal;