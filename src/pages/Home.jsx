import React from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom"
import axios from "axios"
import instance from '../utils/axiosConfig'

const Home = () => {
  const [posts,setPosts] = React.useState([])
  const navigate = useNavigate()
  const cat = useLocation().search
  axios.defaults.withCredentials = true

  React.useEffect(() => {
    const fetch = async() => {
      try{
        const res = await instance.get(`https://afpoc-blog.herokuapp.com/api/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  }, [cat])

    // gets the richtext and transforms it into normal text
    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
    }
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post)=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`https://res.cloudinary.com/dmqnk9v0d/image/upload/v1662744035/${post.img}.jpg`} alt=''/>
            </div>
            <div className="content">
            <Link to={`/post/${post.idposts}`} className="link">
            <h1>{post.title}</h1>
            </Link>
            <p>{getText(post.desc)}</p>
            <button onClick={() => {navigate(`/post/${post.idposts}`)}}>leia mais</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home