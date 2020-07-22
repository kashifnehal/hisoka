import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { updateProfile } from '../../store/actions/profileActions';

class ProfilePage extends Component {
    state = {
        showEdit: false,
        name: '',
        bio: '',
        updateFlag: false,
    }

    setEditTrue = () => {
        this.setState({ showEdit: true })
    }
    setEditFalse = () => {
        this.setState({ showEdit: false })
    }

    componentDidUpdate = () => {
        if (this.state.updateFlag === false) {
            if (this.props.user !== null) {
                this.setState({ name: this.props.user.name, bio: this.props.user.bio, updateFlag: true })
            }
        }
    }

    profileUpdateHandler = async () => {
        const data = {
            name: this.state.name,
            bio: this.state.bio
        }
        const res2 = await this.props.onUpdateProfile(data, this.props.user._id)
        this.setState({ showEdit: false })
    }

    render() {
        // console.log('is loading', this.props.isLoading)
        // console.log('profile data frm page', this.props.user);
        let proDetails = null
        if (this.props.user !== null) {
            proDetails = (
                <div>
                    <h1 style={{ marginTop: '100px' }}>PROFILE</h1>
                    <Image src={process.env.PUBLIC_URL + '/images/cover.jpg'} style={{ height: '80px', width: '150px' }} />
                    <Image src={process.env.PUBLIC_URL + '/images/default.png'} roundedCircle style={{ height: '50px', width: '50px' }} />

                    <h4>name:{this.props.user.name}</h4>
                    <h4>bio:{this.props.user.bio}</h4>
                    <h4>username:{this.props.user.username}</h4>
                    <h4>Links- Timeline About Friends Photos More</h4>
                    <button onClick={this.setEditTrue}>EDIT</button>
                </div>
            )
        }
        let editComp = null
        if (this.state.showEdit) {
            editComp = (
                <div>
                    <input type="text" placeholder="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <input type="text" placeholder="bio" value={this.state.bio} onChange={e => this.setState({ bio: e.target.value })} />
                    <button onClick={this.setEditFalse}>CANCEL</button>
                    <button onClick={this.profileUpdateHandler}>UPDATE</button>
                </div>
            )
        }
        return (
            <Auxiliary >
                {proDetails}
                {editComp}
            </Auxiliary>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onLoadPost: () => dispatch(loadPost()),
        onUpdateProfile: (data, profileId) => dispatch(updateProfile(data, profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));