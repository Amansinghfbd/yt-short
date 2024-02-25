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
    setIsMuted(!isMuted);                   //For Mute Button
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);       //For Like button
  };

  const handleScrollUp = () => {
    setScrollPosition((prevPosition) => prevPosition - window.innerHeight);
    window.scrollBy({
      top: -window.innerHeight,             //For Scroll Up Functioning
      behavior: "smooth",
    });
  };

  const handleScrollDown = () => {
    setScrollPosition((prevPosition) => prevPosition + window.innerHeight);
    window.scrollBy({
      top: window.innerHeight,              //For Scroll Down Functioning
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);       //For Playing Video
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
    if (videoRef.current) {                         //For Video Time Update
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

  useEffect(() => {                                   //For Update Video-Info
    if (videoData) {
      setTitle(videoData.title);
    }
  }, [videoData]);

  useEffect(() => {
    if (videoData) {
      setName(videoData.name);
    }
  }, [videoData]);

  useEffect(() => {                                   //For Update Video-Play
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

            <div style={{ position: "relative" }}>
              <video
                ref={videoRef}
                className="video"
                autoPlay={isPlaying}
                loop
                muted={isMuted}
                src={videoData?.source}
                type="video/mp4"
              />

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

              <div className="info">
                <div className="name text" title="name">
                  {name}
                </div>
                <div className="title text" title="title">
                  {title}
                </div>
                <div className="time text" title="time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
