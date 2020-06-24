import React from 'react'
import EachPost from './EachPost/EachPost'


const PostDetails = (props)=> {
    
    console.log(props.postData)

    // const post = props.postData.map(n =>(
    //     <EachPost
    //     key={n}
    //     pic={this.state.postData.pic}
    //     name={this.state.postData.name}
    //     date={this.state.postData.data}
    //     caption={this.state.postData.caption}
    //     media={this.state.postData.media}
    //     likes={this.state.postData.likes}
    //     />
    // ))
    
    // const post = Object.keys(props.postData )
    // console.log(post)
    //     .map( n => {
    //         return (
    //             <EachPost
    //             key={n}
    //             pic={this.state.postData.pic}
    //             name={this.state.postData.name}
    //             date={this.state.postData.data}
    //             caption={this.state.postData.caption}
    //             media={this.state.postData.media}
    //             likes={this.state.postData.likes}
    //             />
    // )})
// console.log(props.postData)
    return(
        <div>
            {/* {post} */}
        </div>
    )    
}

export default PostDetails