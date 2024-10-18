import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

type AudioPlayerProps = {
  audioUrl: string;
  onTimeUpdate: (time: number) => void;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onTimeUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("loadedmetadata", () =>
        setDuration(audio.duration)
      );
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        onTimeUpdate(audio.currentTime);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", () =>
          setDuration(audio.duration)
        );
        audio.removeEventListener("timeupdate", () => {
          setCurrentTime(audio.currentTime);
          onTimeUpdate(audio.currentTime);
        });
      }
    };
  }, [onTimeUpdate]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
      onTimeUpdate(value);
    }
  };

  return (
    <Box width="100%">
      <audio ref={audioRef} src={audioUrl} />
      <HStack spacing={4} align="center">
        <IconButton
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          colorScheme="teal"
          size="lg"
        />
        <Slider
          aria-label="audio-progress"
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSliderChange}
          flex="1"
          focusThumbOnChange={false}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
    </Box>
  );
};
