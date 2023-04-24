import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requests } from "../helper/requests";
import axios from "../helper/axios";
import Header from '../components/Header';
import { shuffle } from "../helper";
import Row from "../components/Row";
import { fetchNetflixOriginals, selectNfOriginals } from "../features/tv/tvSlice";

function Browse(props) {
  const { platform } = useParams();
  const [videoByRating, setVideoByRating] = useState([]);
  const [genreList, setGenreList] = useState(null);

  useEffect(() => {
    const getVideoByRating = async () => {
      const response = await axios.get(requests.discoverByRating(platform));
      setVideoByRating(response.data.results);
    };

    const getGenreList=async(type)=>{
      const response = await axios(requests.getGenre(type));
      const res = shuffle(response.data.genres);      
      setGenreList(res);
    }

    if(platform){
      getGenreList(platform);
    }
    getVideoByRating();
  }, [platform]);

  const random = Math.floor(Math.random() * videoByRating?.length);

  return (
    <>
    <Header video={videoByRating[random]} type={platform}/>
    <div className="container-fluid">
    { genreList ?
    <>
    <Row selector={selectNfOriginals} action={fetchNetflixOriginals} title={genreList[0]?.name} type={platform} genres={genreList[0]}/>
    <Row selector={selectNfOriginals} action={fetchNetflixOriginals} title={genreList[1]?.name} type={platform} genres={genreList[1]}/>
    <Row selector={selectNfOriginals} action={fetchNetflixOriginals} title={genreList[2]?.name} type={platform} genres={genreList[2]}/>
    <Row selector={selectNfOriginals} action={fetchNetflixOriginals} title={genreList[3]?.name} type={platform} genres={genreList[3]}/>
    </>
    : ""
    }


      {/* <div className="row video-row gy-4">
        {videoByRating?.map((item) => {
          return (
            <div key={item.id} className="col-lg-3">
              <Card video={item} type={platform}/>
            </div>
          );
        })}
      </div> */}
    </div>
    </>
  );
}

export default Browse;
