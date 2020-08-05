import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
// import { logout } from '../../store/actions/authActions'
import { logout } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'




class Logout extends Component {
    componentDidMount() {
        this.props.onlogout()
    }
    render() {
        return <Redirect to="/" />
    }
}


const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onlogout: () => dispatch(logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));