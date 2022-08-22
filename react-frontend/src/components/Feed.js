import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import PostService from '../services/PostService'
import SocialService from '../services/SocialService'


const Feed = () => {

  const [text, setText] = useState('')
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])
  const {id} = useParams()

  useEffect(() => {
    getAllPosts();
  }, [])

  const getAllPosts = () => {
      PostService.getAllPostsWithNames().then((response)=>{

          setPosts(response.data)

      }).catch(error => {
            console.log(error)
      })
  }

  const deletePost = (postId) => {
      PostService.deletePost(postId).then((response)=>{
        getAllPosts();
        console.log(response.data)

      }).catch(error => {
          console.log(error)
      })
  }

  const savePost = (e) => {
      e.preventDefault();
      const posterId = id
      const post = {text, posterId}

      PostService.createPost(post).then((response)=>{
        getAllPosts();
        console.log(response.data)

        }).catch(error => {
            console.log(error)
        })
      getAllPosts();
      window.location.reload();
  }

  const editTime = (post) => {
      let createdAt = (post.post.createdAt).toString()
      let time = createdAt.substr(11, 18)
      let date = createdAt.substr(0, 10)
      return <span> Posted At: {time} on {date} </span>



  }

  const canDelete = (post) => {

        if(post.post.posterId == id)
        {
            return <button style = {{width: 100}} onClick={() => deletePost(post.post.id)}> Delete </button>
        }
  }



  return (
    <div>   
        <div>
            <textarea 
                placeholder = 'Type to create new post...'
                value = {text}
                onChange={(e) => setText(e.target.value)}>
            </textarea>
            <button onClick={(e) => savePost(e)}> Create </button>
            <Link to = {`/homepage/${id}`}>
                <button> Back </button>
            </Link>
        </div>
        <div>
            <textarea 
                placeholder = "Filter by..."
                value = {query}
                onChange={(e) => setQuery(e.target.value)}>
            </textarea>
        </div>
        <div>
        {console.log(posts)}
            {
                posts.filter((post) => post.post.text.includes(query)).map((post) => {
                    return (<div className = 'post' key = {post.id}>
                        <span> {post.post.text} </span>
                        <span> By: {post.fullName} </span>
                        {
                            editTime(post)
                        }
                        {
                            canDelete(post)
                        }
                    </div> )
                })
            }        
        </div>
    </div>
  )
}

export default Feed