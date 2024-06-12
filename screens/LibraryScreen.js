import React from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const songs = [
  {
    id: '1',
    title: 'A Miracle Would Happen',
    lyricsAndChords: [
      [
        { word: "Everyone", chords: ["A7"] },
        { word: "tells", chords: [] },
        { word: "you", chords: [] },
        { word: "that", chords: ["A7/C"] },
        { word: "the", chords: ["A7/C#"] },
        { word: "minute", chords: ["D9"] },
        { word: "you", chords: [] },
        { word: "get", chords: [] },
        { word: "married", chords: ["D9/C"] }
      ],
      [
        { word: "Every", chords: [] },
        { word: "other", chords: [] },
        { word: "woman", chords: [] },
        { word: "in", chords: [] },
        { word: "the", chords: [] },
        { word: "world", chords: [] },
        { word: "suddenly", chords: [] },
        { word: "finds", chords: [] },
        { word: "you", chords: [] },
        { word: "attractive", chords: [] }
      ],
      [
        { word: "Well,", chords: [] },
        { word: "that's", chords: [] },
        { word: "not", chords: [] },
        { word: "true", chords: [] }
      ],
      [
        { word: "It", chords: ["A7"] },
        { word: "only", chords: [] },
        { word: "affects", chords: [] },
        { word: "the", chords: [] },
        { word: "kind", chords: [] },
        { word: "of", chords: [] },
        { word: "women", chords: [] },
        { word: "you", chords: [] },
        { word: "always", chords: [] },
        { word: "wanted", chords: [] },
        { word: "to", chords: [] },
        { word: "sleep", chords: [] },
        { word: "with", chords: [] }
      ],
      [
        { word: "But", chords: ["A7/C", "A7/C#"] },
        { word: "they", chords: [] },
        { word: "wouldn't", chords: [] },
        { word: "give", chords: [] },
        { word: "you", chords: [] },
        { word: "the", chords: [] },
        { word: "time", chords: [] },
        { word: "of", chords: [] },
        { word: "day", chords: [] },
        { word: "before", chords: [] }
      ],
      [
        { word: "And", chords: ["A7"] },
        { word: "now", chords: [] },
        { word: "they're", chords: [] },
        { word: "banging", chords: [] },
        { word: "down", chords: [] },
        { word: "your", chords: [] },
        { word: "door", chords: [] }
      ],
      [
        { word: "And", chords: [] },
        { word: "falling", chords: [] },
        { word: "to", chords: [] },
        { word: "their", chords: [] },
        { word: "knees", chords: [] }
      ],
      [
        { word: "At", chords: ["G7/E", "G7", "G7/G#", "G7/A"] },
        { word: "least", chords: [] },
        { word: "that's", chords: [] },
        { word: "what", chords: [] },
        { word: "it", chords: [] },
        { word: "feels", chords: [] },
        { word: "like", chords: [] },
        { word: "because", chords: [] },
        { word: "you", chords: [] }
      ],
      [
        { word: "Can", chords: ["A7"] },
        { word: "Not", chords: [] },
        { word: "Touch", chords: [] },
        { word: "Them", chords: [] }
      ],
      [
        { word: "In", chords: [] },
        { word: "fact,", chords: [] },
        { word: "you", chords: [] },
        { word: "can't", chords: [] },
        { word: "even", chords: [] },
        { word: "look", chords: [] },
        { word: "at", chords: [] },
        { word: "them", chords: [] }
      ],
      [
        { word: "Close", chords: ["G9"] },
        { word: "your", chords: [] },
        { word: "eyes,", chords: [] },
        { word: "close", chords: [] },
        { word: "your", chords: [] },
        { word: "eyes,", chords: [] },
        { word: "close", chords: [] },
        { word: "your", chords: [] },
        { word: "eyes", chords: [] }
      ],
      [
        { word: "Except", chords: ["LH1:D"] },
        { word: "you're", chords: [] },
        { word: "sitting", chords: [] },
        { word: "there", chords: [] }
      ],
      [
        { word: "Eating", chords: ["LH:A"] },
        { word: "your", chords: [] },
        { word: "corned", chords: [] },
        { word: "beef", chords: [] },
        { word: "sandwich", chords: [] }
      ],
      [
        { word: "And", chords: ["F7"] },
        { word: "all", chords: [] },
        { word: "of", chords: [] },
        { word: "a", chords: [] },
        { word: "sudden,", chords: [] },
        { word: "this", chords: [] },
        { word: "pair", chords: [] },
        { word: "of", chords: [] },
        { word: "breasts", chords: [] },
        { word: "walks", chords: [] },
        { word: "by", chords: [] }
      ],
      [
        { word: "And", chords: [] },
        { word: "smiles", chords: [] },
        { word: "at", chords: [] },
        { word: "you", chords: [] }
      ],
      [
        { word: "And", chords: ["E7"] },
        { word: "you're", chords: [] },
        { word: "like", chords: [] },
        { word: "\"That's", chords: [] },
        { word: "not", chords: [] },
        { word: "fair!\"", chords: [] }
      ],
      [
        { word: "And", chords: ["F#m7"] },
        { word: "in", chords: [] },
        { word: "a", chords: [] },
        { word: "perfect", chords: [] },
        { word: "world", chords: [] }
      ],
      [
        { word: "A", chords: ["F#m7/E"] },
        { word: "miracle", chords: [] },
        { word: "would", chords: [] },
        { word: "happen", chords: [] }
      ],
      [
        { word: "And", chords: ["D7"] },
        { word: "every", chords: [] },
        { word: "other", chords: [] },
        { word: "girl", chords: [] },
        { word: "would", chords: [] },
        { word: "fly", chords: [] },
        { word: "away", chords: [] }
      ],
      [
        { word: "And", chords: ["F#m7"] },
        { word: "it'd", chords: [] },
        { word: "be", chords: [] },
        { word: "me", chords: [] },
        { word: "and", chords: [] },
        { word: "Cathy", chords: [] }
      ],
      [
        { word: "And", chords: ["Eadd6/G#"] },
        { word: "nothing", chords: [] },
        { word: "else", chords: [] },
        { word: "would", chords: [] },
        { word: "matter", chords: [] }
      ],
      [
        { word: "But", chords: ["A9/G"] },
        { word: "it's", chords: [] },
        { word: "fine,", chords: [] },
        { word: "it's", chords: [] },
        { word: "fine,", chords: [] },
        { word: "it's", chords: [] },
        { word: "fine", chords: [] }
      ],
      [
        { word: "I", chords: ["D/F#"] },
        { word: "mean,", chords: [] },
        { word: "I'm", chords: [] },
        { word: "happy", chords: [] }
      ],
    ]
  }]


export default function LibraryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => navigation.navigate('Song', { song: item })}
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