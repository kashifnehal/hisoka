import React, { Component } from 'react';

class Login extends Component {
    state = {
        username:'',
        password:''
    }
    onStartLogin = () => {
        console.log('login function started')
    }
    // onUsernameChange = (e) => {
    //     this.setState({})
    // }
    render() {
        console.log(this.state.username,this.state.password)
        return (
            <div>
                <form style={{marginTop:'150px'}}>
                    <input type="text" placeholder="username" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})}/>
                    <input type="text" placeholder="password" value={this.state.password} onChange={(e) => this.setState({password:e.target.value})} />
                    <button onClick={this.onStartLogin}>submit</button>
                </form>
            </div>
        );
    }
}

export default Login;