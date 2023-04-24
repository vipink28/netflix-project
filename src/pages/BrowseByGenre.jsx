import React, { useEffect, useState } from "react";
import { requests } from "../helper/requests";
import axios from "../helper/axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";

function BrowseByGenre(props) {
  const { platform, genrename, genreid } = useParams();
    const [videoByGenre, setVideoByGenre] = useState([]);
    const [platformOption, selectPlatformOption] = useState('movie');
    const [genreList, setGenreList]=useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    const getVideoByGenre = async () => {
      const response = await axios.get(requests.getByGenre(genreid, platform));
      setVideoByGenre(response.data.results);
    };
    getVideoByGenre();
  }, [platform, genreid]);

  const getGenreList=async(type)=>{
    const response = await axios(requests.getGenre(type));
    setGenreList(response.data.genres);
  }


  useEffect(()=>{
    if(platform){
        getGenreList(platform);
    }
  }, [platform])

  const onPlatformSelect = async(e)=>{
    const {value}=e.target;
    getGenreList(value);
    selectPlatformOption(value);
  }

  const onGenreSelect=(e)=>{
    // console.log(e);
    // console.log(e.target.options[e.target.options.selectedIndex].text)
    const text = e.target.options[e.target.options.selectedIndex].text;
    const {value}= e.target;
    navigate(`/browsebygenre/${platformOption}/${text}/${value}`)
  }

  return (
    <div className="pt-5 mt-5 container-fluid">
      <div className="d-flex">
        <h3 className="text-white mb-4 mt-4">{genrename}</h3>
        <div className="ms-auto d-flex w-25 align-items-center">
          <p className="text-nowrap mb-0 me-2">Select Genre</p>
            <select className="form-select d-inline-flex me-3" name="platform" onChange={onPlatformSelect}>
                <option defaultValue="movie" value="movie">Movie</option>
                <option value="tv">Tv</option>                
            </select>
            <select className="form-select d-inline-flex" name="genre" onChange={onGenreSelect}>
                <option defaultValue="action">Select Genre</option>
               {
                genreList.map((item)=>{
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })
               }                
            </select>
        </div>
      </div>
      <div className="row gy-4">
        {videoByGenre.map((item) => {
          return (
            <div key={item.id} className="col-lg-3">
              <Card video={item} type={platform} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrowseByGenre;
