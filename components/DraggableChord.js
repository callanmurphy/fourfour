import React, { useState, useRef } from "react";
import { Animated, PanResponder, Text, StyleSheet } from "react-native";
import Haptic from "react-native-haptic-feedback";

const DraggableChord = ({ chord, index, moveChord, setIsDragging }) => {
  const pan = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      setIsDragging(false);
      moveChord(index, gestureState.dy);
      pan.setValue({ x: 0, y: 0 });
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.chord, { transform: pan.getTranslateTransform() }]}
    >
      <Text>{chord.value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chord: {
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
    fontFamily: "monospace",
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
});

export default DraggableChord;
