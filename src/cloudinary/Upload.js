import axios from "axios"

export const Upload = async({file}) => {
  const formData = new FormData()
    formData.append("file", file)
    formData.append("api_key", "989846142342293")
    formData.append("upload_preset", "afpoc123")

    const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dmqnk9v0d/auto/upload`, formData, {
     headers: { "Content-Type": "multipart/form-data"}
  })
    const storedImg = cloudinaryResponse.data
    console.log(storedImg)
    
    return storedImg.public_id
}