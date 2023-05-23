import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPlatform,
  selectVideoDetails,
} from "../features/common/commonSlice";
import { dateFormat, formatCurrency, numToTime } from "../helper";
import VideoPlayer from "./VideoPlayer";
import { requests } from "../helper/requests";
import axios from "../helper/axios";
import Card from "./Card";
import GenreLink from "./GenreLink";
import Ratings from "./Ratings";
import EpisodeList from "./EpisodeList";

function Popup(props) {
  const { data } = useSelector(selectVideoDetails);
  const type = useSelector(selectPlatform);

  const [similarVideos, setSimilarVideos] = useState();
  const [recommendedVideos, setRecommendedVideos] = useState();
  const [credits, setCredits] = useState();
  const [director, setDirector]=useState();
  const [producer, setProducer]=useState();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const getSimilarVideos = async () => {
      const response = await axios.get(requests.getSimilar(data.id, type));
      setSimilarVideos(response.data.results);
    };

    const getRecommendedVideos = async () => {
      const response = await axios.get(requests.getRecommended(data.id, type));
      setRecommendedVideos(response.data.results);
    };

    const getVideoCredits = async () => {
      const response = await axios.get(requests.getCredits(data.id, type));
      setCredits(response.data);
      const director = response.data.crew.filter(item=>item.job === 'Director');
      setDirector(director);
      const producer = response.data.crew.filter(item=>item.job === 'Producer' || item.job === 'Executive Producer');
      setProducer(producer);
    };

    if (data && type) {
      getSimilarVideos();
      getRecommendedVideos();
      getVideoCredits();
      setShowVideo(true);
    }

  }, [data, type]);

  const closePopup=()=>{
    setShowVideo(false);
  }

  return (
    <div className="modal" tabIndex="-1" id="videoDetails">
      <div className="modal-dialog">
        {
        data ?         
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closePopup}
            ></button>
          </div>
          <div className="modal-body">
            {data?.videos.results[0]?.key && showVideo && (
              <VideoPlayer videoList={data?.videos.results} />
            )}

            <div className="p-3">
              <div className="row">
                <div className="col-lg-7">
                  <div className="py-2">
                    <h3 className="mb-0">{data?.name || data?.title || data?.original_title}</h3>
                  </div>
                  <div className="d-flex align-items-center py-2">
                    {data?.release_date ? (
                      <p className="pe-4 mb-0">{dateFormat(data?.release_date)}</p>
                    ) : (
                      <p className="pe-4 mb-0">{dateFormat(data?.first_air_date)}</p>
                    )}
                    {data?.runtime ? (
                      <p className="me-4 mb-0">{data?.runtime ? numToTime(data?.runtime) : numToTime(data?.episode_run_time[0])}</p>
                    ) : (
                      <p className="me-4 mb-0">{numToTime(data?.episode_run_time)}</p>
                    )}
                    <div style={{'marginTop': '-13px'}}>
                    <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count}/>
                    </div>
                  </div>
                  <p className="mt-3 mb-5">{data?.overview}</p>
                </div>
                <div className="col-lg-5">
                  <div className="py-2">
                    <span className="text-muted">Cast: </span>
                    {credits?.cast.map((item, index) => {
                      return (
                          index <= 10 ? 
                          <span key={item.id}>{item.name}{index < 10  ?  ', ':''}</span> : ""
                      );
                    })}
                  </div>

                  <div className="py-2">
                    <span className="text-muted">Genres: </span>
                    {data?.genres.map((item, index) => {
                      return (
                        <>
                        <GenreLink key={item.id} genre={item} type={type} isBadge={false} isLast={index === data?.genres.length-1 ? true: false }/>
                       </>
                      );
                    })}
                  </div>
                  <div className="py-2">
                    <span className="text-muted">Production Companies: </span>
                    {data?.production_companies?.map((item, index) => {
                      return (
                          index <= 1 ? 
                          <span key={item.id}>{item.name}{index < 1 ? ', ':''}</span> : ""
                      );
                    })}
                  </div>
                  {
                    data?.revenue ?
                  <div className="py-2">
                    <span className="text-muted">Revenue: </span>
                    <span>{formatCurrency(data?.revenue)}</span>
                  </div>: ""
                  }
                </div>
              </div>
              {
                data?.seasons ?
                <EpisodeList tvId={data?.id} seasons={data?.seasons}/> : ""
              }
              
              { similarVideos?.length > 0 ?
              <div className="row gy-3">
                <h5>Similar {type === "tv" ? "Shows": "Movies"}</h5>
                {similarVideos?.map((item, index) => {
                  return (
                    index < 6 ? 
                    <div key={item.id} className="col-lg-4">
                    <Card video={item} type={type} />
                    </div> : ""
                  )
                })}
              </div>: ""
              }

              {
                recommendedVideos?.length > 0 ?
                <div className="row gy-3 mt-5">
                <h5>Recommended {type === "tv" ? "Shows": "Movies"}</h5>
                {recommendedVideos?.map((item, index) => {          
                  return (
                    index < 6 ? 
                    <div key={item.id} className="col-lg-4">
                    <Card video={item} type={type} />
                    </div> : ""
                  )
                })}
              </div>: ""
              }
              

              <hr />
              <div className="row">
                <div className="col-lg-12">
                <h3 className="mb-3"><span className="fw-light">About</span> {data?.name || data?.title || data?.original_title}</h3>
                <p className="mb-1"><span className="text-muted">Director: </span> { director?.map((item, index)=>{
                    return <span>{item.name}{index < director.length-1 && ', '} </span> 
                  }) }</p>
                  <p className="mb-1"><span className="text-muted">Producer: </span> { producer?.map((item, index)=>{
                    return <span>{item.name}{index < producer.length-1 && ', '} </span> 
                  }) }</p>
                  <p className="mb-1"><span className="text-muted">Cast: </span> { credits?.cast.map((item, index)=>{
                    return <span>{item.name}{index < credits?.cast.length-1 && ', '} </span> 
                  }) }</p>
                </div>
              </div>

            </div>
          </div>
        </div> : ""
        }
      </div>
    </div>
  );
}

export default Popup;
