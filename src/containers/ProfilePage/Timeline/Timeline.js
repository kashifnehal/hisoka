import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { updateProfile, getUserPosts } from '../../../store/actions/profileActions';
import EachPost from '../../../components/EachFormat/EachPost/EachPost'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

class Timeline extends Component {


    // componentDidMount = async () => {
    //     console.log('from timeline mount');
    //     this.props.OngetUserPosts(this.props.user._id)
    // }

    callUserPosts = () => {
        // const res2 = await this.props.OngetUserPosts(this.props.user._id)
        if (this.props.allUserPosts !== null) {
            return this.props.allUserPosts.map(curpost => {
                return <EachPost post={curpost} key={curpost._id} callComment={() => this.toCommentPageHandler(curpost._id)} />
            })
        }
    }

    render() {

        return (
            <Auxiliary>
                {/* {this.callUserPosts()} */}
                timeline
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        // isAuthenticated: state.auth.isAuthenticated,
        allPosts: state.following.allPosts,
        allUserPosts: state.profile.allUserPosts,
        profileUpdating: state.profile.profileUpdating,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onLoadPost: () => dispatch(loadPost()),
        // onUpdateProfile: (data, profileId) => dispatch(updateProfile(data, profileId)),
        OngetUserPosts: (profileId) => dispatch(getUserPosts(profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));