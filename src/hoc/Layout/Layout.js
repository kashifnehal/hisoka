import React, {Component} from 'react'
import Aux from '../Auxiliary/Auxiliary'

class Layout extends Component {
    render () {
        return(
            <Aux>
                <div>shortcuts, pages, friends</div>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout