import React, {Component} from 'react'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShortcutsCol from '../../components/ShortcutsCol/ShortcutsCol'
import PagesToFollowCol from '../../components/PagesToFollowCol/PagesToFollowCol'
import FriendsCol from '../../components/FriendsCol/FriendsCol'
import classes from './Following.css'

class FollowingPage extends Component{
    render(){
        let attachedClassesLeft = ["d-none d-lg-block",classes.Left]
        let attachedClassesRight = ["d-none d-md-block",classes.Right]
        return (
            <div className={classes.FollowingPage}>
                <Container fluid className={classes.FollowingContainer}>
                    <Row >
                        <Col lg={3} className={attachedClassesLeft.join(' ')}>
                            <ShortcutsCol /> 
                        </Col>
                        <Col md={8} lg={6} className={classes.Main}>
                            {/* <Following /> */}
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                            <h1>maingas oasi</h1>
                        </Col>
                        <Col xs={4} lg={3} className={attachedClassesRight.join(' ')}>
                            <PagesToFollowCol />
                            <FriendsCol />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FollowingPage