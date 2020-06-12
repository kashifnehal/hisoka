import React, {Component} from 'react'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShortcutsCol from '../../components/ShortcutsCol/ShortcutsCol'
import PagesToFollowCol from '../../components/PagesToFollowCol/PagesToFollowCol'
import FriendsCol from '../../components/FriendsCol/FriendsCol'

class Following extends Component{
    render(){
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col md={3} style={{ border:'red 1px solid'}}>
                            <ShortcutsCol /> 
                        </Col>
                        <Col md={6} style={{ border:'grey 1px solid'}}>
                            <Following />
                        </Col>
                        <Col md={3} style={{ border:'green 1px solid'}}>
                            <PagesToFollowCol />
                            <FriendsCol />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Following