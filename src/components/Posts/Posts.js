import React from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

const posts = (props) => {
    return(
        <Auxiliary>
            <Container>
                <Row>
                    img,name,date
                </Row>
                <Row>
                    caption
                </Row>
                <Row>
                    media
                </Row>
                <Row>
                    views,like,comment,power
                </Row>
            </Container>
        </Auxiliary>
    )
}

export default posts