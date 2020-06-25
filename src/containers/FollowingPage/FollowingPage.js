import React, {Component} from 'react'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShortcutsCol from '../../components/ShortcutsCol/ShortcutsCol'
import PagesToFollowCol from '../../components/PagesToFollowCol/PagesToFollowCol'
import FriendsCol from '../../components/FriendsCol/FriendsCol'
import Following from './Following/Following'
import classes from './FollowingPage.css'

class FollowingPage extends Component{
    render(){
        // let attachedClassesLeft = ["d-none d-lg-block",classes.Left]
        // let attachedClassesRight = ["d-none d-md-block",classes.Right]
        return (
            <div className={classes.FollowingPage}>
                <Container fluid className={classes.FollowingContainer}>
                    <Row >
                        <Col lg={1}></Col>
                        <Col lg={2} className={classes.Left}>
                            <ShortcutsCol /> 
                        </Col>
                        <Col xs={12} sm={9} md={6} lg={5} className={classes.Main}>
                            <Following />
                        </Col>
                        <Col md={3} lg={2} className={classes.Right}>
                            <PagesToFollowCol />
                            <FriendsCol />
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default FollowingPage