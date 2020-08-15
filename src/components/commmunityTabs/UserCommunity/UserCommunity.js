import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Image } from 'react-bootstrap'

const UserCommunity = (props) => {
    let pic = <Image src={process.env.PUBLIC_URL + '/images/' + String(props.curcom.pic)} style={{ height: '80px', width: '150px' }} />
    return (
        <Auxiliary>
            <div style={{ backgroundColor: 'white' }}>
                <p>{pic}</p>
                <p><b>name</b>:{props.curcom.name}</p>
                <p><b>university</b>:{props.curcom.university}</p>
                <p><b>privacy</b>:{props.curcom.communityPrivacy}</p>
            </div>
        </Auxiliary>
    );
};

export default UserCommunity;