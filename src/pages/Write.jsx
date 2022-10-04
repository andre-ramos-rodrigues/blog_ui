import React from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { Upload } from '../cloudinary/Upload'
import {AuthContext} from "../context/authContext"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

// React-quill allow us to use richtext in our input
// we just need to import it and its css, create a state of name "value" and use it as a component passing the theme, the value and the onChange

const Write = () => {
  const state = useLocation().state
  const [value, setValue] = React.useState(state?.desc || "")
  const [title, setTitle] = React.useState(state?.title || "")
  const [file, setFile] = React.useState("")
  const [cat, setCat] = React.useState(state?.cat || "")

  const {currentUser} = React.useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    // saving image on Cloudinary
    const formData = new FormData()
    formData.append("file", file)
    formData.append("api_key", "989846142342293")
    formData.append("upload_preset", "afpoc123")

    const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dmqnk9v0d/auto/upload`, formData, {
     headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin":true}
  })

    const storedImg = cloudinaryResponse.data
    console.log(storedImg)
    const cloudImg = storedImg.public_id

    // posting it with axios using the cloudinary response to save the image url on mySQL
   try{
    state? // if state, its upload a post
    (await axios.put(`https://afpoc-blog.herokuapp.com/api/posts/${state.id}`, {
      title: title, desc: value, img: cloudImg, cat: cat, postId: state.idposts, token: localStorage.getItem("token")
    }, {withCredentials: true})) 
    : // if dont, its create a new post
    (await axios.post("https://afpoc-blog.herokuapp.com/api/posts", {
      title: title, desc: value, img: cloudImg, cat: cat,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), token: localStorage.getItem("token")
    }, {withCredentials: true}))

    navigate("/")

   }catch(err){
    console.log(err)
   }
  }

  return (
    <div className="write">
      <div className="content">
        <input type="text" placeholder='Título' value={title} onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} className="editor"/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <input style={{display: "none"}} type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file">Selecionar imagem
          </label>
          {file && <p style={{color: "teal"}}>Imagem carregada com sucesso</p>}
          <div className="buttons">
            <button onClick={handleSubmit}>Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categoria</h1>
          <div className="cat">
          <input type="radio" checked={cat==="festa"}name="cat" value="festa" id="festa" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="festa">festa</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="reuniao"}name="cat" value="reuniao" id="reuniao" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="reuniao">reunião</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="evento"}name="cat" value="evento" id="evento" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="evento">evento</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="diretoria"}name="cat" value="diretoria" id="diretoria" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="diretoria">diretoria</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="novidade"}name="cat" value="novidade" id="novidade" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="novidade">novidade</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write