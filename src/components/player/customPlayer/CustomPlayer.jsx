import React from "react";
import ReactPlayer from "react-player";

const CustomPlayer = ({
  songId,
  playerRef,
  songsInfo,
  setAudioLoading,
  playerState,
  setPlayerState,
  handleNext,
  activeToggle,
  isLoading,
  autoPlay,
  setAlertMessage,
  setIsReady,
}) => {
  // ✅ When player is ready
  const handleReady = () => {
    setIsReady(true);
    setAudioLoading(false);
  };

  // ✅ When error occurs
  const handleError = () => {
    setAlertMessage("Error loading media");
    setAudioLoading(false);
  };

  return (
    <div className="custom-player-wrapper">
      {activeToggle === "video" ? (
        // 🎬 VIDEO MODE
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${songId}`}
          playing={playerState.playing}
          volume={playerState.volume}
          muted={playerState.muted}
          onReady={handleReady}
          onError={handleError}
          onProgress={(state) =>
            setPlayerState((prev) => ({ ...prev, ...state }))
          }
          onEnded={handleNext}
          width="100%"
          height="100%"
        />
      ) : (
        // 🎧 AUDIO MODE
        <>
          {/* Hidden audio player */}
          <ReactPlayer
            ref={playerRef}
            url={
              playerState.url ||
              `https://www.youtube.com/watch?v=${songId}`
            }
            playing={playerState.playing}
            volume={playerState.volume}
            muted={playerState.muted}
            onReady={handleReady}
            onError={handleError}
            onProgress={(state) =>
              setPlayerState((prev) => ({ ...prev, ...state }))
            }
            onEnded={handleNext}
            width="0px"
            height="0px"
          />

          {/* Thumbnail UI (Audio mode) */}
          <div
            style={{
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://i.ytimg.com/vi/${songId}/hqdefault.jpg`}
              alt="audio-thumbnail"
              style={{
                width: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPlayer;
