import React, { Component } from 'react'
// import  classes from './ProfileNav.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { logout } from '../../../store/actions/authActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class ProfileNav extends Component {

    startLogout = () => {
        this.props.onlogout()
        // this.props.history.push({
        //     pathname: "profilePage"
        // })
    }
    render() {
        return (
            <div >
                <Container>
                    <Row>
                        <Col sm={4} style={{ border: 'red 1px solid' }}><ion-icon name="home-outline" size="large"></ion-icon></Col>
                        <Col lg={6} className="d-none d-lg-block" style={{ border: 'green 1px solid' }}><button onClick={this.startLogout}>logout</button></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onReturnErrors: () => dispatch(returnErrors()),
        onlogout: () => dispatch(logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNav));