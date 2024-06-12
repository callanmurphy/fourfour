import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LyricsChordsDisplay = ({ lyricsAndChords, styles }) => {
  const [lines, setLines] = useState(lyricsAndChords);

  const handleLyricsChange = (text, lineIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex].lyrics = text;
    setLines(updatedLines);
  };

  const handleChordChange = (text, lineIndex, chordIndex) => {
    const updatedLines = [...lines];
    updatedLines[lineIndex].chords[chordIndex].chord = text;
    setLines(updatedLines);
  };

  const handleChordPositionChange = (text, lineIndex, chordIndex) => {
    const updatedLines = [...lines];
    const position = parseInt(text, 10);
    if (!isNaN(position)) {
      updatedLines[lineIndex].chords[chordIndex].index = position;
    }
    setLines(updatedLines);
  };

  return (
    <View style={styles.lyricsContainer}>
      {lines.map((line, lineIndex) => {
        const chordsLine = [];
        let previousIndex = 0;

        line.chords.forEach((chord, chordIndex) => {
          const spacesCount = Math.max(chord.index - previousIndex, 0);
          const spaces = " ".repeat(spacesCount);
          chordsLine.push(
            <Text
              key={`space-${lineIndex}-${chordIndex}`}
              style={styles.chordPlaceholder}
            >
              {spaces}
            </Text>
          );
          chordsLine.push(
            <View
              key={`chord-${lineIndex}-${chordIndex}`}
              style={styles.chordContainer}
            >
              <TextInput
                style={styles.chord}
                value={chord.chord}
                onChangeText={(text) =>
                  handleChordChange(text, lineIndex, chordIndex)
                }
              />
              <TextInput
                style={styles.chordPosition}
                value={chord.index.toString()}
                keyboardType="numeric"
                onChangeText={(text) =>
                  handleChordPositionChange(text, lineIndex, chordIndex)
                }
              />
            </View>
          );
          previousIndex = chord.index + chord.chord.length;
        });

        return (
          <View key={lineIndex} style={styles.lineContainer}>
            <View style={styles.chordsLineContainer}>{chordsLine}</View>
            <View style={styles.lyricsLineContainer}>
              <TextInput
                style={styles.lyrics}
                value={line.lyrics}
                onChangeText={(text) => handleLyricsChange(text, lineIndex)}
                multiline
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default function SongScreen({ route }) {
  const { song } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <LyricsChordsDisplay
          lyricsAndChords={song.lyricsAndChords}
          styles={styles}
        />
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
    padding: 20,
  },
  lyricsContainer: {
    flexDirection: "column",
  },
  chordsLineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginTop: 5,
  },
  lyricsLineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  wordContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginRight: 5,
  },
  chordContainer: {
    backgroundColor: "#444",
    padding: 4,
    borderRadius: 4,
    marginHorizontal: 2,
    marginBottom: 5,
  },
  chord: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  lyrics: {
    fontSize: 18,
    color: "#000",
  },
});
