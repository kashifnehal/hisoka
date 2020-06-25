import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Image from 'react-bootstrap/Image'

class ProfilePage extends Component {
    render() {
        return(
            <Auxiliary >
                <p style={{marginTop:'100px'}}>profile</p>
                <Image src="" alt="cover" fluid />
                <Image src="" alt="propic" fluid  />
                <h4>name</h4>
                <h4>bio</h4>
                <h4>bio</h4>
                <h4>Links- Timeline About Friends Photos More</h4>

            </Auxiliary>
        )
    }
}

export default ProfilePage