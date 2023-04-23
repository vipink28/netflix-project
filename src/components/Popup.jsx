import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPlatform,
  selectVideoDetails,
} from "../features/common/commonSlice";
import { dateFormat, numToTime } from "../helper";
import VideoPlayer from "./VideoPlayer";
import { requests } from "../helper/requests";
import axios from "../helper/axios";
import Card from "./Card";
import GenreLink from "./GenreLink";

function Popup(props) {
  const { data } = useSelector(selectVideoDetails);
  const type = useSelector(selectPlatform);

  const [similarVideos, setSimilarVideos] = useState();
  const [recommendedVideos, setRecommendedVideos] = useState();
  const [credits, setCredits] = useState();
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
                    <h5>{data?.name || data?.title || data?.original_title}</h5>
                  </div>
                  <div className="d-flex align-items-center py-2">
                    {data?.release_date ? (
                      <p className="pe-2">{dateFormat(data?.release_date)}</p>
                    ) : (
                      <p className="pe-2">{dateFormat(data?.first_air_date)}</p>
                    )}

                    {data?.runtime ? (
                      <p>{numToTime(data?.runtime)}</p>
                    ) : (
                      <p>{numToTime(data?.episode_run_time)}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="py-2">
                    {data?.genres.map((item) => {
                      return (
                       <GenreLink genre={item} type={type}/>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="row gy-3">
                <h3>Similar {type === "tv" ? "Shows": "Movies"}</h3>
                {similarVideos?.map((item, index) => {          
                  return (
                    index < 6 ? 
                    <div key={item.id} className="col-lg-4">
                    <Card video={item} type={type} />
                    </div> : ""
                  )
                })}
              </div>

              <div className="row gy-3 mt-5">
                <h3>Recommended {type === "tv" ? "Shows": "Movies"}</h3>
                {recommendedVideos?.map((item, index) => {          
                  return (
                    index < 6 ? 
                    <div key={item.id} className="col-lg-4">
                    <Card video={item} type={type} />
                    </div> : ""
                  )
                })}
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
