import { useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { vocabulary } from "../data/vocabulary";

export default function VocabularyScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Greetings",
    "Polite",
    "Family",
    "Food",
    "Travel",
  ];

  const filteredWords = vocabulary.filter((item) => {
    const matchesSearch =
      item.word
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.meaning
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 15,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        📖 Vocabulary
      </Text>

      <TextInput
        placeholder="Search words..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "white",
          padding: 14,
          borderRadius: 15,
          marginBottom: 15,
        }}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() =>
              setSelectedCategory(category)
            }
            style={{
              backgroundColor:
                selectedCategory === category
                  ? "#4F46E5"
                  : "white",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory === category
                    ? "white"
                    : "black",
                fontWeight: "bold",
              }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 18,
              borderRadius: 18,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {item.word}
            </Text>

            <Text
              style={{
                marginTop: 5,
                fontSize: 16,
              }}
            >
              Meaning: {item.meaning}
            </Text>

            <Text
              style={{
                marginTop: 3,
                color: "#6B7280",
              }}
            >
              Pronunciation: {item.pronunciation}
            </Text>

            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#EEF2FF",
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#4F46E5",
                  fontWeight: "bold",
                }}
              >
                {item.category}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}