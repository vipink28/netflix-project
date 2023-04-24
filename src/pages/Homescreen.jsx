import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, fetchPopularTv, selectNfOriginals, selectPopularTv } from '../features/tv/tvSlice';
import Row from '../components/Row';
import { fetchPopularMovies, fetchTopRatedMovies, selectPopularMovies, selectTopRatedMovies } from '../features/movie/movieSlice';
import { key } from '../helper/requests';
function Homescreen(props) {
    const nfOriginals = useSelector(selectNfOriginals);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchNetflixOriginals());
    }, [dispatch])
    const random = Math.floor(Math.random() * nfOriginals.data?.results.length);
    return (
        <>
            <Header video={nfOriginals.data?.results[random]} type="tv" />
            <div className='container-fluid py-3'>
                <Row selector={selectPopularMovies} action={fetchPopularMovies} title="Popular Movies" type={key.movie} />

                <Row selector={selectTopRatedMovies} action={fetchTopRatedMovies} title="Top Rated Movies" type={key.movie}/>

                <Row selector={selectPopularTv} action={fetchPopularTv} title="Popular Shows" type={key.tv}/>
        
            </div>
        </>
    );
}

export default Homescreen;