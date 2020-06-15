import React, {Component} from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Footbar from '../../components/Navigation/Footbar/Footbar'

class Layout extends Component {

    render () {
        return(
            <Aux>
                <Toolbar/>
                <main>
                    {this.props.children}
                </main>
                <Footbar />
            </Aux>
        )
    }
}

export default Layout