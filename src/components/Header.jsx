import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import { dateFormat, truncateText } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeaderVideo,
  fetchVideoDetails,
  platform,
  selectHeaderVideo,
} from "../features/common/commonSlice";
import VideoPlayer from "./VideoPlayer";
import GenreLink from "./GenreLink";
import Loader from "./Loader";

function Header(props) {
  const { video, type } = props;
  const details = useSelector(selectHeaderVideo);
  const dispatch = useDispatch();

  const [showVideo, setShowVideo] = useState(false);
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    if (video) {
      dispatch(fetchHeaderVideo({ type: type, id: video?.id }));
    }
  }, [video, type, dispatch]);

  useEffect(() => {
    setShowVideo(false);
    if (details) {
      setTrailer(details.data?.videos.results);
    }
  }, [details]);

  const handleVideo = () => {
    setShowVideo(true);
  };

  const getDetails = () => {
    dispatch(fetchVideoDetails({ type: type, id: video.id }));
    dispatch(platform(type));
  };

  return (
    <div className="position-relative h-100 text-white w-100">
      { details.status === 'success' ?
      <div className="h-100">
        {!showVideo ? (
          <>
            <img
              className="header-img"
              src={`https://image.tmdb.org/t/p/original/${video?.backdrop_path}`}
              alt="header"
            />
            <div className="caption">
              <h1 className="display-2 title mb-0">
                {truncateText(
                  details.data?.name ||
                    details.data?.title ||
                    details.data?.original_title,
                  30
                )}
              </h1>
              {details.data?.tagline ? (
                <h3 className="fs-2 tagline text-warning mb-4">
                  {details.data?.tagline}
                </h3>
              ) : (
                ""
              )}

              {details.data?.first_air_date ? (
                <p className="fs-4">
                  ({dateFormat(details.data?.first_air_date)})
                </p>
              ) : null}

              <p className="fs-4">
                {truncateText(details.data?.overview, 150)}
              </p>
              <p>
                {details.data?.genres.map((item) => {
                  return <GenreLink key={item.id} genre={item} type={type} isBadge={true} />;
                })}
              </p>

              <Ratings
                voteAverage={details.data?.vote_average}
                voteCount={details.data?.vote_count}
              />

              <button
                className="btn btn-danger mt-3 me-2"
                onClick={handleVideo}
              >
                Play
              </button>
              <button
                className="btn btn-warning mt-3"
                data-bs-toggle="modal"
                data-bs-target="#videoDetails"
                onClick={getDetails}
              >
                More Info
              </button>
            </div>
          </>
        ) : (
          <VideoPlayer videoList={trailer} />
        )}
        <div className="header-vignette"></div>
        <div className="header-bottom-vignette"></div>
      </div> : <Loader />
      }
    </div>
  );
}

export default Header;
