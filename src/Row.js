import React, { useState, useEffect } from 'react'
import axios from './axios'
// import requests from './request';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const base_image_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState();
    // snippet of code based on specific condition
    // useEffect == componentDidMount
    // useEffect ==> Whenever components loads(here it is Row.js) this snippet of code will run
    // [] ==> whatever we write in square brackets ([]) useEffect will run only if that changes and if it is empty on page reload.

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const playTrailer = (movie) => {
        console.log(movie)
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || "")
                .then(url => {
                    //
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(error => console.log(error))
        }
    }
    return (
        <div className="row">
            {/* title  */}
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => {
                    return (
                        <img key={movie.id} src={`${base_image_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            onClick={() => playTrailer(movie)}
                        />
                    )
                })}
            </div>
            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
