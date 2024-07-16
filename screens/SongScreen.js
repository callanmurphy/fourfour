import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLOURS } from "../config";
import DraggableChord from "../components/DraggableChord";

const parseContent = (body) => {
  if (!body) return [];
  return body
    .split("\n")
    .map((line) =>
      line
        .split(/(\s+)/g)
        .map((part) =>
          /^\(*[A-G][#b]?[mM]?\d*(\/[A-G][#b]?[mM]?\d*)?\)*$/.test(part.trim())
            ? { type: "chord", value: part }
            : { type: "lyrics", value: part }
        )
    );
};

const EditableText = ({ body, onChangeBody, isEditing, setIsDragging }) => {
  const [content, setContent] = useState(parseContent(body));
  const [cursorPosition, setCursorPosition] = useState(null);
  const [draggingChordIndex, setDraggingChordIndex] = useState(null);

  const handleTextChange = (newText) => {
    onChangeBody(newText);
    setContent(parseContent(newText));
  };

  const moveChord = (index, dx, dy) => {
    const lineIndex = Math.floor(index / content[0].length);
    const partIndex = index % content[0].length;
    const newContent = [...content];
    const line = newContent[lineIndex];
    const chord = line[partIndex];

    line.splice(partIndex, 1);

    const newLineIndex = Math.min(
      Math.max(lineIndex + Math.round(dy / 40), 0),
      newContent.length - 1
    );

    const newPartIndex = Math.min(
      Math.max(partIndex + Math.round(dx / 40), 0),
      newContent[newLineIndex].length
    );

    newContent[newLineIndex].splice(newPartIndex, 0, chord);
    setContent(newContent);
    setDraggingChordIndex(null); // Reset dragging state
  };

  const onDragging = (moveX, moveY) => {
    const lineHeight = 40; // Assume a fixed line height
    const charWidth = 20; // Assume a fixed character width
    const lineIndex = Math.floor(moveY / lineHeight);
    const partIndex = Math.floor(moveX / charWidth);
    setCursorPosition({ lineIndex, partIndex });
  };

  return (
    <View style={styles.lyricsContainer}>
      {isEditing ? (
        <TextInput
          style={styles.editableText}
          value={body}
          onChangeText={handleTextChange}
          multiline
          autoFocus
        />
      ) : (
        content.map((line, lineIndex) => (
          <View key={lineIndex} style={styles.lineContainer}>
            {line.map((part, partIndex) =>
              part.type === "chord" ? (
                <DraggableChord
                  key={partIndex}
                  chord={part}
                  index={lineIndex * content[0].length + partIndex}
                  moveChord={moveChord}
                  setIsDragging={(isDragging) => {
                    setIsDragging(isDragging);
                    setDraggingChordIndex(
                      isDragging
                        ? lineIndex * content[0].length + partIndex
                        : null
                    );
                  }}
                  onDragging={onDragging}
                  isDragging={
                    draggingChordIndex ===
                    lineIndex * content[0].length + partIndex
                  }
                />
              ) : (
                <Text key={partIndex} style={styles.lyrics}>
                  {part.value}
                </Text>
              )
            )}
            {cursorPosition?.lineIndex === lineIndex && (
              <View
                style={[styles.cursor, { left: cursorPosition.partIndex * 20 }]}
              />
            )}
          </View>
        ))
      )}
    </View>
  );
};

export default function SongScreen({ route, navigation }) {
  const { song } = route.params || {};
  const [body, setBody] = useState(song?.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsDragging(false);
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, isEditing]);

  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No song data available.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={!isDragging}
      >
        <EditableText
          body={body}
          onChangeBody={setBody}
          isEditing={isEditing}
          setIsDragging={setIsDragging}
        />
      </ScrollView>
      {!isEditing && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Icon name="create" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 70,
  },
  lyricsContainer: {
    flexGrow: 1,
  },
  lineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  lyrics: {
    fontSize: 18,
    color: "#000",
    fontFamily: "monospace",
  },
  editableText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "monospace",
    textAlignVertical: "top",
    minHeight: "100%",
    marginBottom: 200,
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLOURS.theme,
    borderRadius: 50,
    padding: 15,
    zIndex: 10,
  },
  doneButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  cursor: {
    position: "absolute",
    height: "100%",
    width: 2,
    backgroundColor: "blue",
    left: 0,
  },
});
