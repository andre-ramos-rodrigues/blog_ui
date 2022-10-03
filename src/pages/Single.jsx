import React from 'react'
import {useParams, useNavigate, Link} from "react-router-dom"
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu'
import axios from 'axios'
import moment from "moment"
import {AuthContext} from "../context/authContext"

const Single = () => {
  const [post,setPost] = React.useState([])
  const {id} = useParams()
  const navigate = useNavigate()
  const {currentUser} = React.useContext(AuthContext)
  const token = localStorage.getItem("token")

  React.useEffect(() => {
    const fetch = async() => {
      try{
        const res = await axios.get(`https://afpoc-blog.herokuapp.com/api/posts/${id}`)
        setPost(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  }, [id])

  const handleDelete = async() => {
    try{
      await axios.delete(`https://afpoc-blog.herokuapp.com/api/posts/${id}`, token, {withCredentials: true})
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  // gets the richtext and transforms it into normal text
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`https://res.cloudinary.com/dmqnk9v0d/image/upload/v1662744035/${post?.pimg}.jpg`} alt=''/>
        <div className="user">
          <div className="userInfo">
            {post?.uimg && <img src={post.uimg} alt="" />}
          <div className="info">
            <span>{post?.username}</span>
            {post?.date && <p>{moment(post.date).fromNow()}</p>}
          </div>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
            <Link to={`/write?edit=${id}`} state={post}>
            <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" onClick={handleDelete}/>
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        {getText(post?.desc)}
      </div>
      <div className="menu"><Menu cat={post?.cat}/></div>
    </div>
  )
}

export default Single