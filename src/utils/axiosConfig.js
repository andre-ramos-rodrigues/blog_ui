import axios from 'axios';

const url = "https://brilliant-palmier-9298e8.netlify.app"

const app = axios.create({
    url,
    withCredentials: true
})

export default app;