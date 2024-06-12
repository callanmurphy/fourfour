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
    body: "A7               (A7/C A7/C#) D9         (D9/C)\nEveryone tells you that the minute you get married\nA7                           (A7/C A7/C#) D9         (D9/C)\nEvery other woman in the world suddenly finds you attractive\nWell, that's not true\nA7                           (A7/C A7/C#) D9         (D9/C)\nIt only affects the kind of women you always wanted to sleep with\nA7                                                                   D7/A  C/A\nBut they wouldn't give you the time of day before\nA7                              D9/G#  D9/G\nAnd now they're banging down your door\nG7\nAnd falling to their knees\n(G7/E G7 G7/G# G7/A)\n                                                    G7/E  G7/G  G7/G#\nAt least that's what it feels like because you\nA7                      (A7/E A7/G A7/G# A7/A)\nCan Not Touch Them\n                                                     (A7/E A7 A7/G# A7/G)\nIn fact, you can't even look at them\nG9                        LH1:D\nClose your eyes, close your eyes, close your eyes\n                          LH1:D’     D7\nExcept you're sitting there\nLH:A                                        LH1:A’\nEating your corned beef sandwich\nF7\nAnd all of a sudden, this pair of breasts walks by\nAnd smiles at you\n                       E7\nAnd you're like \"That's not fair!\"\n               F#m7                 F#m7/E\nAnd in a perfect world\n    D7\nA miracle would happen\n        F#m7                      F#m7/E     D9  (RH1: riff)\nAnd every other girl would fly away\n                   F#m7           Eadd6/G#\nAnd it'd be me and Cathy\n             A9/G                    D/F#\nAnd nothing else would matter\n             F#m/D     A/C#      B7\nBut it's fine, it's fine, it's fine\nI mean, I'm happy\n             F#m/D     A/C#      B7\nAnd I'm fine, I'm fine, I'm fine\nIt's not a problem\n                          A/E  (RH2: hit high A chord)\nIt's just a challenge\n                                D/E\nIt's a challenge to resist\n\nTemptation",
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
