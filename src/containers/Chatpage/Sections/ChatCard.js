import React from "react";
import moment from 'moment';
import Tooltip from 'react-bootstrap/Tooltip'
// import { Comment, Tooltip, Avatar } from 'antd';

function ChatCard(props) {
    return (
        <div style={{ width: '100%', backgroundColor: 'white' }}>
            <p>{props.sender.name}</p>
            <p style={{ marginTop: '-20px' }}>{props.message}</p>
            {/* <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')} style={{ color: 'red', backgroundColor: 'blue' }}>
                <p>{moment().fromNow()}</p>
            </Tooltip> */}
        </div>
    )
}

export default ChatCard;