import axios from 'axios'

/** base URL to make request to the movie databse */

const instanse = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default instanse;