import React, { useEffect, useState } from "react";
import axios from '../helper/axios';
import { requests } from "../helper/requests";
import placeholderImg from '../assets/img-placeholder-dark.jpg';
import { numToTime } from "../helper";

function EpisodeList(props) {
const { tvId, seasons } = props;
const [seasonId, setSeasonId]=useState(seasons[0]?.season_number);
const [episodes, setEpisodes]=useState([]);

useEffect(()=>{
    const getSeasonEpisodes = async()=>{
        const response = await axios.get(requests.getSesaonDetails(tvId, seasonId));
        setEpisodes(response.data.episodes)
    }
    getSeasonEpisodes();
}, [tvId, seasonId])

const handleSelect=(e)=>{
    const {value}=e.target;
    setSeasonId(value);
}
  return (
    <div className="pt-3">
      <div className="d-flex">
        <h3 className="text-white mb-4 mt-4">Episodes</h3>
        <div className="ms-auto d-flex w-25 align-items-center">
          <p className="text-nowrap mb-0 me-2">Select Season</p>
          <select className="form-select d-inline-flex me-3" name="platform" onChange={handleSelect}>
            { seasons?.map((item)=>{
                return <option key={item.id} value={item.season_number}>{item.name}</option>
                })            
            }
          </select>
        </div>
      </div>
      {episodes.map((item, index) => {
          return (
            index < 10 ?
      <div className="row py-3 align-items-center">        
            <div key={item.id} className="col-lg-1 text-center">
              <h3 className="fw-light">{item?.episode_number}</h3>
            </div>
            <div className="col-lg-2">
                <img className="img-fluid" src={item?.still_path ? `https://image.tmdb.org/t/p/original/${item?.still_path}`: placeholderImg} alt="" />
            </div>
            <div className="col-lg-8">
                <h5>{item?.name}</h5>
                <p>{item?.overview}</p>
            </div>
            <div className="col-lg-1">
                {numToTime(item?.runtime)}
            </div>
            <hr />       
      </div>: ""
       );
    })}
    </div>
  );
}

export default EpisodeList;
