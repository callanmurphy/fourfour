import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const songs = [
  {
    id: "1",
    title: "A Miracle Would Happen",
    lyricsAndChords: [
      {
        lyrics: "Everyone tells you that the minute you get married",
        chords: [
          { chord: "A7", index: 0 },
          { chord: "A7/C", index: 14 },
          { chord: "A7/C#", index: 0 },
          { chord: "D9", index: 10 },
          { chord: "D9/C", index: 10 },
        ],
      },
      {
        lyrics: "Every other woman in the world suddenly finds you attractive",
        chords: [
          { chord: "A7/C", index: 0 },
          { chord: "A7/C#", index: 0 },
          { chord: "D9", index: 6 },
        ],
      },
      {
        lyrics: "Well, that's not true",
        chords: [],
      },
      {
        lyrics:
          "It only affects the kind of women you always wanted to sleep with",
        chords: [{ chord: "A7", index: 0 }],
      },
      {
        lyrics: "But they wouldn't give you the time of day before",
        chords: [
          { chord: "A7/C", index: 0 },
          { chord: "A7/C#", index: 6 },
        ],
      },
      {
        lyrics: "And now they're banging down your door",
        chords: [],
      },
      // Continue with the rest of the lyrics and chords...
    ],
  },
];

export default function LibraryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => navigation.navigate("Song", { song: item })}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  songItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  songTitle: {
    fontSize: 18,
  },
});
