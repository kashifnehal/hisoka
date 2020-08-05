import React from "react";
import moment from 'moment';
import Tooltip from 'react-bootstrap/Tooltip'
// import { Comment, Tooltip, Avatar } from 'antd';
import Image from 'react-bootstrap/Image'

function ChatCard(props) {
    return (
        <div style={{ width: '100%', backgroundColor: 'white', marginTop: '15px' }}>
            <p>{props.sender.name}</p>

            {props.type === "Text" ?
                <p style={{ marginTop: '-20px' }}>{props.message}</p> :
                <Image src={process.env.PUBLIC_URL + '/images/' + String(props.message)} alt='no image' fluid style={{ height: '150px', width: '170px' }} />
            }

            {/* <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')} style={{ color: 'red', backgroundColor: 'blue' }}>
                <p>{moment().fromNow()}</p>
            </Tooltip> */}
        </div>
    )
}

export default ChatCard;