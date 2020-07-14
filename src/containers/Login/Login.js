import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="username" />
                    <input type="text" placeholder="password" />
                    <button>submit</button>
                </form>
            </div>
        );
    }
}

export default Login;