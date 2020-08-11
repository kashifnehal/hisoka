import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Image } from 'react-bootstrap'

const OverallCommunity = (props) => {
    let pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(props.curcom.pic)} style={{ height: '80px', width: '150px' }} />
    return (
        <Auxiliary>
            <div style={{ backgroundColor: 'white' }}>
                <p>{pic}</p>
                <p>name:{props.curcom.name}</p>
                <p>university:{props.curcom.university}</p>
                <p>privacy:{props.curcom.communityPrivacy}</p>
            </div>
        </Auxiliary>
    );
};

export default OverallCommunity;
