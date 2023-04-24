import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../helper/requests";
import axios from "../helper/axios";

function Row(props) {
  const { action, selector, title, type, genres }= props;
  const dispatch = useDispatch();
  const videoList = useSelector(selector);
  const [videoByGenre, setVideoByGenre] = useState(null);

 
  useEffect(() => {
    const getVideoByGenre = async () => {
      const response = await axios.get(requests.getByGenre(genres.id, type));
      setVideoByGenre(response.data.results);
    };  
    if(genres){
      getVideoByGenre();
    }else{
      dispatch(action(type));
    }    
  }, [action, dispatch, type, genres]);


  return (
    <div className="py-3 video-row">
      <h3 className="mb-3">{title}</h3>
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
    >
      {
      videoByGenre ? videoByGenre.map((item)=>{
        return (
          item.backdrop_path ?
          <SwiperSlide key={item.id}>
            <Card video={item} type={type}/>
          </SwiperSlide> : ""
        );
      })
      :
      videoList.data?.results?.map((item) => {
        return (
          item.backdrop_path ?
          <SwiperSlide key={item.id}>
            <Card video={item} type={type}/>
          </SwiperSlide> : ""
        );
      })}
    </Swiper>
    </div>
  );
}

export default Row;
