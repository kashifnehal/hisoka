import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { register } from '../../store/actions/authActions'
import { login } from '../../store/actions/authActions'
import { clearErrors } from '../../store/actions/errorActions'
import { logout, loadUser } from '../../store/actions/authActions';


//=== USE CLEAR ERRORS, USED IN VIDEO I HAVE NOT USED YET


class Login extends Component {
    state = {
        username: '',
        password: '',
        msg: '',
        ulog: '',
        plog: '',
        msglog: '',
    }
    onStartRegister = async (event) => {
        event.preventDefault();
        console.log('login function started')
        const res2 = await this.props.onRegister(this.state.username, this.state.password)
        console.log('checking is auth', this.props.isAuthenticated);
        // if (this.props.isAuthenticated) {
        // await this.props.onLoadUser()
        // }
        if (this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/followingPage"
            })
        }
    }
    onStartLogin = async (event) => {
        event.preventDefault();
        console.log('login function started')
        const res = await this.props.onLogin(this.state.ulog, this.state.plog)
        // if (this.props.isAuthenticated) {
        // await this.props.onLoadUser()
        // }
        console.log('b4 history', this.props.isAuthenticated)
        if (this.props.isAuthenticated) {
            console.log('inside login history', this.props.isAuthenticated)
            this.props.history.push({
                pathname: "/followingPage"
            })
        }
    }

    onStartLogout = (event) => {
        event.preventDefault();
        this.props.onLogout()
    }

    componentDidUpdate = (prevProps) => {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            console.log('inside if');
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                console.log('inside else of if');
                this.setState({ msg: null })
            }
        }
        // if (error !== prevProps.error) {
        //     console.log('inside if');
        //     //check for register error
        //     if (error.id === 'LOGIN_FAIL') {
        //         this.setState({ msglog: error.msg.msg })
        //     } else {
        //         console.log('inside else of if');
        //         this.setState({ msglog: null })
        //     }
        // }

        // if (isAuthenticated === true) {
        //     this.props.history.push({
        //         pathname: "/followingPage",
        //     });
        // }
    }
    render() {
        // console.log(this.state.username, this.state.password)
        return (
            <div>
                <form style={{ marginTop: '150px' }}>
                    <h1>REGISTRATION</h1>
                    <input type="text" placeholder="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                    <input type="text" placeholder="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    <button onClick={this.onStartRegister}>submit</button>
                    <button onClick={this.onStartLogout}>logout</button>
                    <p style={{ color: 'red' }}>{this.state.msg}</p>
                </form>
                <form style={{ marginTop: '150px' }}>
                    <h1>LOGIN</h1>
                    <input type="text" placeholder="ulog" value={this.state.ulog} onChange={(e) => this.setState({ ulog: e.target.value })} />
                    <input type="text" placeholder="plog" value={this.state.plog} onChange={(e) => this.setState({ plog: e.target.value })} />
                    <button onClick={this.onStartLogin}>submit</button>
                    <button onClick={this.onStartLogout}>logout</button>
                    <p style={{ color: 'red' }}>{this.state.msglog}</p>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        // isAuthenticated: state.auth.token !== null
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRegister: (username, password) => dispatch(register(username, password)),
        onLogin: (username, password) => dispatch(login(username, password)),
        onLogout: () => dispatch(logout()),
        onLoadUser: () => dispatch(loadUser())

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));