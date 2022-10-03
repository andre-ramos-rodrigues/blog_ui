import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Menu = ({cat}) => {
  const [posts,setPosts] = React.useState([])
  const navigate = useNavigate()
  const {id} = useParams()

  React.useEffect(() => {
    const fetch = async() => {
      try{
        const res = await axios.get(`https://afpoc-blog.herokuapp.com/api/posts/?cat=${cat}`)
        
        setPosts(res.data)
        
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  }, [cat, id])
 
  return (
    <div className="menu">
      <h1>Outras postagens relacionadas:</h1>
      {posts.map((post) => (
        <div className="post" key={post.idposts}>
          <img src={`https://res.cloudinary.com/dmqnk9v0d/image/upload/v1662744035/${post.img}.jpg`} alt=''/>
          <h2>{post.title}</h2>
          <button onClick={() => navigate(`/post/${post.idposts}`, {replace: true})}>leia mais</button>
        </div>
      ))}
    </div>
  )
}

export default Menu