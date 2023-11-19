import axios from "axios";

const SERVER_URL="http://localhost:4000/api";

export default axios.create({
    baseURL: SERVER_URL
});