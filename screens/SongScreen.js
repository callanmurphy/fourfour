import React, { useState, useMemo, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons
import { COLOURS } from "../config";

const parseContent = (body) => {
  if (!body) return [];
  const lines = body.split("\n");
  return lines.map((line) => {
    const parts = line.split(/(\s+)/g); // Split by spaces to keep them
    return parts.map((part) => {
      if (
        /^\(*[A-G][#b]?[mM]?\d*(\/[A-G][#b]?[mM]?\d*)?\)*$/.test(part.trim())
      ) {
        return { type: "chord", value: part };
      }
      return { type: "lyrics", value: part };
    });
  });
};

const EditableText = ({ body, onChangeBody, isEditing }) => {
  const content = useMemo(() => parseContent(body), [body]);

  const handleTextChange = (newText) => {
    onChangeBody(newText);
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
            {line.map((part, partIndex) => (
              <Text
                key={partIndex}
                style={part.type === "chord" ? styles.chord : styles.lyrics}
              >
                {part.value}
              </Text>
            ))}
          </View>
        ))
      )}
    </View>
  );
};

export default function SongScreen({ route, navigation }) {
  const { song } = route.params || {}; // Default to an empty object if route.params is undefined
  const [body, setBody] = useState(song?.body || ""); // Default to an empty string if song.body is undefined
  const [isEditing, setIsEditing] = useState(false);

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <EditableText
          body={body}
          onChangeBody={setBody}
          isEditing={isEditing}
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
    </View>
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
  chord: {
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
    fontFamily: "monospace",
    backgroundColor: "#e0e0e0",
    padding: 2,
    // marginVertical: 2,
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
    marginBottom: 200, // manual keyboard avoiding view
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
  doneButton: {
    position: "absolute",
    top: 20,
    right: 20,
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
});
