import React from 'react';
import classes from './SideDrawer.css';
import Backdrop from '../../Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} closeback={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    LOGO
                </div>
                <div>
                    <p>bla</p>
                    <p>bla</p>
                    <p>bla</p>
                    <p>bla</p>
                </div>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;