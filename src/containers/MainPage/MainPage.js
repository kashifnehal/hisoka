// import React, { Component } from 'react';
// import WhitePage from '../../components/WhitePage/WhitePage'
// import Login from '../Login'
// import Layout from '../../hoc/Layout/Layout'
// import { connect } from 'react-redux'
// import { withRouter } from "react-router";
// import { Switch, Route, Redirect } from 'react-router-dom'

// class MainPage extends Component {
//     render() {
//         let currPage = (
//             <WhitePage />
//         )
//         if (this.props.isAuthenticated) {
//             <Layout>
//                 <Switch>
//                     <Route path="/followingPage" component={FollowingPage} />
//                     <Route path="/profilePage" component={ProfilePage} />
//                     <Redirect to="/followingPage" />
//                 </Switch>
//             </Layout>
//         } else {
//             <Login />
//         }
//         return (
//             <div>
//                 {currPage}
//             </div>
//         );
//     } 
// }



// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         // onLoadPost: () => dispatch(loadPost()),
//     }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));