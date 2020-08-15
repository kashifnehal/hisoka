import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Image, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { addInFolCom, deleteInFolCom } from '../../../store/actions/communityActions'

class UnivCommunity extends Component {
    state = {
        followText: ''
    }
    followClicked = async () => {
        if (this.state.followText === 'Following') {
            this.setState({ followText: 'Follow' })
            await this.props.onDeleteInFolCom(this.props.user._id, this.props.curcom._id)

        }
        else if (this.state.followText === 'Follow') {
            await this.props.onAddInFolCom(this.props.user._id, this.props.curcom._id)
            this.setState({ followText: 'Following' })
        }
    }
    componentDidMount = () => {
        if (this.props.user.folCommunities.includes(this.props.curcom._id)) {
            this.setState({ followText: 'Following' })
        } else {
            this.setState({ followText: 'Follow' })
        }
    }

    render() {
        // console.log('loader', this.props.folComLoader);

        let pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(this.props.curcom.pic)} style={{ height: '80px', width: '150px' }} />
        return (
            <Auxiliary>
                <div style={{ backgroundColor: 'white' }}>
                    <p>{pic}</p>
                    <Button onClick={this.followClicked} size="sm">{this.state.followText}</Button>
                    <p><b>name</b>:{this.props.curcom.name}</p>
                    <p><b>university</b>:{this.props.curcom.university}</p>
                    <p><b>privacy</b>:{this.props.curcom.communityPrivacy}</p>
                </div>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        folComLoader: state.community.folComLoader,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddInFolCom: (profileId, comId) => dispatch(addInFolCom(profileId, comId)),
        onDeleteInFolCom: (profileId, comId) => dispatch(deleteInFolCom(profileId, comId)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnivCommunity));
