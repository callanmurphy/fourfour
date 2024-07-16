import React, { useState, useRef } from "react";
import { Animated, PanResponder, Text, StyleSheet } from "react-native";
import Haptic from "react-native-haptic-feedback";

const DraggableChord = ({
  chord,
  index,
  moveChord,
  setIsDragging,
  onDragging,
  isDragging,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        listener: (event, gestureState) => {
          onDragging && onDragging(gestureState.moveX, gestureState.moveY);
        },
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        setIsDragging(false);
        pan.setValue({ x: 0, y: 0 });
        moveChord(index, gestureState.dx, gestureState.dy);
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        styles.chord,
        isDragging ? styles.draggingChord : null,
      ]}
    >
      <Text style={[isDragging ? styles.draggingChordText : null]}>
        {chord.value}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chord: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "monospace",
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
  draggingChord: {
    backgroundColor: "#444",
  },
  draggingChordText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DraggableChord;
