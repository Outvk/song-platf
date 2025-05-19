import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';

const Card = ({ song }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [mousePosition, setMousePosition] = useState({ x: 20, y: 30 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / progressBar.offsetWidth;
      const newTime = percent * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <StyledWrapper isDark={isDark}>
      <div className="card" onMouseMove={handleMouseMove}>
        <audio
          ref={audioRef}
          src={song?.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="one">
          <span className="title">Music</span>
          <div className="music">
            <svg viewBox="0 0 16 16" className="note bi bi-music-note" fill="currentColor" height={18} width={18} xmlns="http://www.w3.org/2000/svg">
              <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
              <path d="M9 3v10H8V3h1z" fillRule="evenodd" />
              <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
            </svg>
          </div>
          <span className="name">{song?.title || 'Unknown Title'}</span>
          <span className="name1">{song?.artist || 'Unknown Artist'}</span>

          {/* Progress Bar */}
          <div className="progress-bar" onClick={handleProgressClick}>
            <div 
              className="progress" 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="bar">
            <button onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}>
              <svg viewBox="0 0 16 16" className="color bi bi-fast-forward-fill" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
                <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
              </svg>
            </button>
            <button onClick={togglePlay}>
              <svg viewBox="0 0 16 16" className="color bi bi-caret-right-fill" fill="currentColor" height={18} width={18} xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(0deg)' }}>
                <path d={isPlaying ? 
                  "M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" : 
                  "m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"} 
                />
              </svg>
            </button>
            <button onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}>
              <svg viewBox="0 0 16 16" className="color bi bi-fast-forward-fill" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(0deg)' }}>
                <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
                <path d="M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z" />
              </svg>
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="bar">
            <svg viewBox="0 0 16 16" className="color1 bi bi-shuffle" fill="currentColor" height={14} width={14} xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" fillRule="evenodd" />
              <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
            </svg>
            <svg viewBox="0 0 16 16" className="color1 bi bi-music-note-list" fill="currentColor" height={14} width={14} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
              <path d="M12 3v10h-1V3h1z" fillRule="evenodd" />
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z" />
              <path d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z" fillRule="evenodd" />
            </svg>
            <button onClick={() => setIsLiked(!isLiked)} className="icon-button">
              <svg viewBox="0 0 16 16" className="color1 bi bi-suit-heart" fill="currentColor" height={14} width={14} xmlns="http://www.w3.org/2000/svg">
                <path d={isLiked ? 
                  "M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" :
                  "m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"}
                />
              </svg>
            </button>
            <svg viewBox="0 0 16 16" className="color1 bi bi-arrow-right" fill="currentColor" height={14} width={14} xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        <div 
          className="two" 
          style={{
            transform: `translate(${mousePosition.x - 80}px, ${mousePosition.y - 80}px)`,
          }}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 320px;
    height: 400px;
    background: ${props => props.isDark ? '#1A1A1A' : '#ffffff'};
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
  }

  .card .one {
    width: 320px;
    height: 400px;
    z-index: 10;
    position: absolute;
    background: ${props => props.isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.55)'};
   
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.18)'};
    transition: all 0.3s ease;
  }

  .card .one .title {
    width: 70px;
    border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(180, 177, 177, 0.308)'};
    display: block;
    margin: 12px auto;
    text-align: center;
    font-size: 18px;
    border-radius: 12px;
    font-family: Roboto, sans-serif;
    color: ${props => props.isDark ? '#ffffff' : '#666464'};
    transition: color 0.3s ease;
  }

  .card .one .music {
    width: 150px;
    height: 150px;
    background: ${props => props.isDark ? 'rgba(40, 40, 40, 0.726)' : 'rgba(216, 212, 212, 0.726)'};
    margin: 30px auto;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }

  .card .one .name {
    width: 150px;
    height: 20px;
    font-size: 12px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    padding: 0 5px;
    margin: -22px auto;
    display: block;
    overflow: hidden;
    text-align: center;
    color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(50, 49, 51, 0.637)'};
    transition: color 0.3s ease;
  }

  .card .one .name1 {
    width: 120px;
    height: 20px;
    font-size: 9px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    padding: 0 5px;
    margin: 19px auto;
    display: block;
    overflow: hidden;
    text-align: center;
    color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(50, 49, 51, 0.637)'};
    transition: color 0.3s ease;
  }

  .card .one .bar {
    width: 100px;
    margin: -15px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    cursor: pointer;
  }

  .card .one .bar:last-child {
    margin: 35px auto;
    width: 100%;
    padding: 2px 23px;
  }

  .card .one .bar .color {
    fill: ${props => props.isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(82, 79, 79, 0.829)'};
    transition: fill 0.3s ease;
  }

  .card .one .bar .color1 {
    fill: ${props => props.isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(29, 28, 28, 0.829)'};
    cursor: pointer;
    transition: fill 0.3s ease;
  }

  .card .one .bar .bi:first-child {
    transform: rotate(180deg);
  }

  .card .one .bar:last-child .color1:first-child {
    transform: rotate(0deg);
  }

  .card .two {
    width: 160px;
    height: 160px;
    background-color: ${props => props.isDark ? 'rgb(147, 51, 234)' : 'rgb(131, 25, 163)'};
    filter: drop-shadow(0 0 10px ${props => props.isDark ? 'rgb(147, 51, 234)' : 'rgb(131, 25, 163)'});
    opacity: ${props => props.isDark ? '0.4' : '1'};
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 5;
  }

  @keyframes one {
    0% {
      transform: translate(20px, 30px);
    }
    20% {
      transform: translate(40px, 50px);
    }
    40% {
      transform: translate(70px, 80px);
    }
    50% {
      transform: translate(40px, 60px);
    }
    60% {
      transform: translate(90px, 35px);
    }
    80% {
      transform: translate(70px, 70px);
    }
    100% {
      transform: translate(20px, 30px);
    }
  }

  @keyframes two {
    0% {
      top: 90px;
      left: 90px;
    }
    20% {
      top: 50px;
      left: 40px;
    }
    40% {
      top: 60px;
      left: 20px;
    }
    50% {
      top: 80px;
      left: 30px;
    }
    60% {
      top: 35px;
      left: 90px;
    }
    80% {
      top: 70px;
      left: 60px;
    }
    100% {
      top: 90px;
      left: 90px;
    }
  }

  .progress-bar {
    width: 80%;
    height: 4px;
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    margin: 20px auto;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
  }

  .progress {
    height: 100%;
    background: ${props => props.isDark ? 'rgb(147, 51, 234)' : 'rgb(131, 25, 163)'};
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .time-display {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
    margin-top: 5px;
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    -webkit-appearance: none;
    background: ${props => props.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 2px;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${props => props.isDark ? 'rgb(147, 51, 234)' : 'rgb(131, 25, 163)'};
      cursor: pointer;
    }
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  .icon-button {
    display: inline-flex;
  }
`;

export default Card; 