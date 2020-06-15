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
        let attachedClassesRight = ["d-none d-lg-block",classes.Right]
        return (
            <div>
                <Container fluid style={{marginTop:'35%'}}>
                    <Row >
                        <Col lg={3} className={attachedClassesLeft.join(' ')}>
                            <ShortcutsCol /> 
                        </Col>
                        <Col xs={12} lg={6} className={classes.Main}>
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
                        </Col>
                        <Col lg={3} className={attachedClassesRight.join(' ')}>
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