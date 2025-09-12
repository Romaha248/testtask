import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default axios.create({
    baseURL: `${baseUrl}/api`
})