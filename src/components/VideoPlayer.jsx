import React, { useEffect, useState } from "react";

function VideoPlayer({ videoList }) {
  const [videoId, setVideoId]=useState('');
  useEffect(()=>{
        if(videoList && videoList.length > 0){
            const filteredArr = videoList.filter((item)=>{
                return item.type === 'Trailer'
            })
            setVideoId(filteredArr[0].key)
        }
  }, [videoList])



  return (
    <div class="ratio ratio-16x9 youtube-player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        title="YouTube video"
        allowFullScreen
        autoplay
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
