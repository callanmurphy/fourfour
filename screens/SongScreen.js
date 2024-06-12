import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const LyricsChordsDisplay = ({ lyricsAndChords, styles }) => {
  const [lines, setLines] = useState(lyricsAndChords);

  const handleWordChange = (text, lineIndex, wordIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex][wordIndex].word = text;
    setLines(updatedLines);
  };

  const handleChordChange = (text, lineIndex, wordIndex, chordIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex][wordIndex].chords[chordIndex] = text;
    setLines(updatedLines);
  };

  const addChord = (lineIndex, wordIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex][wordIndex].chords.push("");
    setLines(updatedLines);
  };

  return (
    <View style={styles.lyricsContainer}>
      {lines.map((line, lineIndex) => (
        <View key={lineIndex} style={styles.lineContainer}>
          {line.map((wordObj, wordIndex) => (
            <View key={`word-${lineIndex}-${wordIndex}`} style={styles.wordContainer}>
              <View style={styles.chordsLineContainer}>
                {wordObj.chords.map((chord, chordIndex) => (
                  <TextInput
                    key={`chord-${lineIndex}-${wordIndex}-${chordIndex}`}
                    style={styles.chord}
                    value={chord}
                    onChangeText={text => handleChordChange(text, lineIndex, wordIndex, chordIndex)}
                  />
                ))}
                {/* <TouchableOpacity onPress={() => addChord(lineIndex, wordIndex)} style={styles.addChordButton}>
                  <Text style={styles.addChordText}>+</Text>
                </TouchableOpacity> */}
              </View>
              <TextInput
                style={styles.lyrics}
                value={wordObj.word}
                onChangeText={text => handleWordChange(text, lineIndex, wordIndex)}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default function SongScreen({ route }) {
  const { song } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <LyricsChordsDisplay lyricsAndChords={song.lyricsAndChords} styles={styles} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  lyricsContainer: {
    flexDirection: "column",
  },
  lineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chordsLineContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 5
  },
  wordContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 3,
    justifyContent: "flex-end"
  },
  chord: {
    fontWeight: "bold",
    color: "#444",
    textAlign: "center",
    fontFamily: "monospace",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  lyrics: {
    fontSize: 18,
    color: "#000",
    fontFamily: "monospace",
  },
  addChordButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    padding: 2,
    marginTop: 5,
  },
  addChordText: {
    fontSize: 12,
    color: "#000",
  },
});