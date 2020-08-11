import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class Community extends Component {
    render() {
        return (
            <Auxiliary style={{ paddingTop: '100px' }}>
                <div>
                    <h1 style={{ marginTop: '100px' }}>PROFILE</h1>
                    <Image src={process.env.PUBLIC_URL + '/images/cover.jpg'} style={{ height: '80px', width: '150px' }} />

                    {/* {this.state.currentUser.profilePic === "" ?
                        <Image src={process.env.PUBLIC_URL + '/images/default.png'} style={{ height: '50px', width: '50px' }} /> :
                        <Image src={process.env.PUBLIC_URL + '/images/' + String(this.state.currentUser.profilePic)} roundedCircle style={{ height: '50px', width: '50px' }} />} */}

                    <p>name:{this.props.location.state.name}</p>
                    <p>bio:only Rockstars will be here</p>
                    <p>college/university:silicon</p>
                    <p>communityPrivacy:{this.props.location.state.communityPrivacy}</p>
                    {/* {this.state.showEditButton ? */}
                    <button onClick={() => this.setState({ showEdit: true })}>EDIT</button>
                    {/* : null} */}
                </div>
            </Auxiliary>
        );
    }
}


const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Community));