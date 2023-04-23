import React from "react";

function YouTubePlayer({ videoId }) {
  return (
    <div className="ratio ratio-16x9 youtube-player">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubePlayer;
