import React, { useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMovies,
  selectPopularMovies,
} from "../features/movie/movieSlice";

function Row(props) {
  const { action, selector, title, type }= props;
  const dispatch = useDispatch();
  const videoList = useSelector(selector);
  useEffect(() => {
    dispatch(action(type));
  }, []);

  return (
    <div className="py-3 video-row">
      <h3 className="mb-3">{title}</h3>
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
    >
      {videoList.data?.results?.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <Card video={item} type={type}/>
          </SwiperSlide>
        );
      })}
    </Swiper>
    </div>
  );
}

export default Row;
