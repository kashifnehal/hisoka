import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import Spinner from '../../Spinner/Spinner'

class EachWhatif extends Component {

    componentDidUpdate = () => {
    }
    render() {
        // let singleWhatif = null;
        console.log('sf', this.props.loadingWhatif)
        let singleWhatif = (this.props.whatifData.map(whatif => {
            return (
                <div key={whatif._id} style={{ backgroundColor: 'white', marginTop: '15px' }}>
                    <p>{whatif.ifname}</p>
                    <p style={{ marginTop: '-20px' }}>{whatif.text}</p>
                    <p style={{ marginTop: '-20px' }}>{whatif.likeCount}</p>
                </div>
            )
        }))

        if (this.props.loadingWhatif) {
            singleWhatif = <Spinner />
        }
        return (
            <div>
                {singleWhatif}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        // user: state.auth.user,
        loadingWhatif: state.whatif.loadingWhatif,
        whatifData: state.whatif.whatifData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onloadWhatif: (profileId) => dispatch(loadWhatif(profileId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EachWhatif));