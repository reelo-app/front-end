// VideoScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView, VideoSource } from 'expo-video';
import ControlsOverlay from '../Video/ControlsOverlay';
import VideoInfoOverlay from '../Video/VideoInfoOverlay';
import { VideoScreenProps } from '@/types/Interfaces';

export default function VideoScreen({
  videoData,
}: VideoScreenProps) {
  const player = useVideoPlayer(videoData.videoSource as VideoSource, (playerInstance) => {
    playerInstance.loop = true;
    if (videoData.isActive) {
      playerInstance.play();
    } else {
      playerInstance.pause();
    }
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const [showControls, setShowControls] = useState(false);
  const controlsOpacity = useRef(new Animated.Value(0)).current;
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const showAndHideControls = () => {
    setShowControls(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }

    hideControlsTimeout.current = setTimeout(() => {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowControls(false);
      });
    }, 800);
  };

  useEffect(() => {
    if (videoData.isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [videoData.isActive, player]);

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    showAndHideControls();
  };

  return (
    <TouchableWithoutFeedback onPress={showAndHideControls}>
      <View style={styles.container}>
        <VideoInfoOverlay videoData={videoData}/>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          allowsVideoFrameAnalysis={false}
        />
        {showControls && (
          <ControlsOverlay
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            opacity={controlsOpacity}
          />
        )}
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
});
