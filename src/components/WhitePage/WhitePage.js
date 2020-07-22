import React, { Component } from 'react';
// import LoadGif from '../../assets/images/load.gif'

class WhitePage extends Component {
    render() {

        return (
            <div style={{ backgroundColor: '#dce3ea' }}>
                <img style={{ backgroundSize: 'cover' }} src="https://media.giphy.com/media/UTkht9eZ4Ot68/source.gif" />
                {/* <img style={{ backgroundSize: 'cover' }} src={LoadGif} /> */}
            </div>
        );
    }
}

export default WhitePage;