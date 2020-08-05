import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import EachPost from '../../../components/EachFormat/EachPost/EachPost'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { loadComment } from '../../../store/actions/commentActions'

class Timeline extends Component {

    state = {
        loadPostFlag: false
    }

    componentDidMount = () => {
        this.setState({ loadPostFlag: true })
    }

    toCommentPageHandler = (postId) => {
        this.setState({ commentShow: true })
        this.props.onLoadComment(postId)
    }

    render() {
        return (
            <Auxiliary>
                {/* {timelinePost} */}
                {this.state.loadPostFlag ?
                    (this.props.allUserPosts.map(curpost => (
                        <EachPost
                            post={curpost}
                            key={curpost._id}
                            userUniversity={this.props.user.university}
                            commentClicked={() => this.toCommentPageHandler(curpost._id)}
                            from="timeline"
                            timelineProfilePic={this.props.user.profilePic}
                        />
                    ))) : null}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        // user: state.auth.user,
        // isAuthenticated: state.auth.isAuthenticated,
        allUserPosts: state.profile.allUserPosts,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadComment: (postId) => dispatch(loadComment(postId)),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));