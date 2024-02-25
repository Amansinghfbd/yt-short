import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  CiPlay1,
  CiPause1,
  CiCircleChevUp,
  CiCircleChevDown,
  CiHeart,
  CiVolumeMute,
  CiVolumeHigh,
} from "react-icons/ci";

const VideoPlayer = ({ videoData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const videoRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const handleScrollUp = () => {
    setScrollPosition((prevPosition) => prevPosition - window.innerHeight);
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    });
  };

  const handleScrollDown = () => {
    setScrollPosition((prevPosition) => prevPosition + window.innerHeight);
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
      };

      const currentVideoRef = videoRef.current;
      currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        if (currentVideoRef) {
          currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.title);
    }
  }, [videoData]);

  useEffect(() => {
    if (videoData) {
      setName(videoData.name);
    }
  }, [videoData]);

  useEffect(() => {
    if (isPlaying) {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        currentVideoRef.play();
      }
    } else {
      const currentVideoRef = videoRef.current;
      if (currentVideoRef) {
        currentVideoRef.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="video-player">
      <div className="video-player_Progress1">
        

        <div className="video-container">
          <div className="video">
            
          <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
        </div>

            <video
              ref={videoRef}
              className="video"
              autoPlay={isPlaying}
              loop
              muted={isMuted}
              src={videoData?.source}
              type="video/mp4"
            />

            <div className="form">
                <div className="time text" title="time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                <div className="title text" title="title">
                    {title}
                </div>
                <div className="name text" title="name">
                    {name}
                </div>
            </div>

          </div>
        </div>
      </div>

      <div className="controls2">
          <button onClick={handlePlayPause} className="control-buttons">
            {isPlaying ? (
              <CiPause1 fontSize={"35"} />
            ) : (
              <CiPlay1 fontSize={"35"} />
            )}
          </button>
        <button
          onClick={handleScrollUp}
          className="control-buttons"
          title="Scroll Up"
        >
          <CiCircleChevUp fontSize={"35"} />
        </button>
        <button
          onClick={handleScrollDown}
          className="control-buttons"
          title="Scroll Down"
        >
          <CiCircleChevDown fontSize={"35"} />
        </button>
        <button
          onClick={handleHeartClick}
          className="control-buttons"
          title="Like"
        >
          <CiHeart
            color={isHeartFilled ? "red" : "currentColor"}
            fontSize={"35"}
          />
        </button>
        <button
          onClick={handleMuteClick}
          className="control-buttons"
          title="Mute"
        >
          {isMuted ? (
            <CiVolumeMute fontSize={"35"} />
          ) : (
            <CiVolumeHigh fontSize={"35"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
