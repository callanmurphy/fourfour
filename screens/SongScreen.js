import React from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const LyricsChordsDisplay = ({ lyricsAndChords, styles }) => {
  return (
    <View style={styles.lyricsContainer}>
      {lyricsAndChords.map((line, lineIndex) => {
        let currentIndex = 0;
        const chordsLine = [];
        let previousIndex = 0;

        line.chords.forEach((chord, chordIndex) => {
          // Calculate spaces before the chord
          const spacesCount = Math.max(chord.index - previousIndex, 0);
          const spaces = ' '.repeat(spacesCount);
          chordsLine.push(
            <Text key={`space-${lineIndex}-${chordIndex}`} style={styles.chordPlaceholder}>{spaces}</Text>
          );
          chordsLine.push(
            <TouchableOpacity key={`chord-${lineIndex}-${chordIndex}`} style={styles.chordContainer} onPress={() => alert(chord.chord)}>
              <Text style={styles.chord}>{chord.chord}</Text>
            </TouchableOpacity>
          );
          previousIndex = chord.index + chord.chord.length;
        });

        return (
          <View key={lineIndex} style={styles.lineContainer}>
            <View style={styles.chordsLineContainer}>
              {chordsLine}
            </View>
            <View style={styles.lyricsLineContainer}>
              <Text style={styles.lyrics}>{line.lyrics}</Text>
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
    padding: 20,
  },
  lyricsContainer: {
    flexDirection: "column",
  },
  chordsLineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    marginTop: 5
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