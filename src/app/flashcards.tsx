import { useRef, useState } from "react";
import {
    Animated,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { vocabulary } from "../data/vocabulary";

export default function FlashcardsScreen() {
  const [index, setIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const flipAnim = useRef(
    new Animated.Value(0)
  ).current;

  const card = vocabulary[index];

  const rotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const handleFlip = () => {
    Animated.spring(flipAnim, {
      toValue: showMeaning ? 0 : 1,
      useNativeDriver: true,
    }).start();

    setShowMeaning(!showMeaning);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#111827",
        }}
      >
        🃏 Flashcards
      </Text>

      <Text
        style={{
          textAlign: "center",
          color: "#6B7280",
          marginBottom: 20,
          fontSize: 16,
        }}
      >
        Card {index + 1} of {vocabulary.length}
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleFlip}
      >
        <Animated.View
          style={{
            backgroundColor: "#4F46E5",
            borderRadius: 25,
            minHeight: 280,
            justifyContent: "center",
            padding: 30,
            elevation: 6,
            transform: [{ rotateY }],
          }}
        >
          {!showMeaning ? (
            <>
              <Text
                style={{
                  color: "white",
                  fontSize: 34,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {card.word}
              </Text>

              <Text
                style={{
                  color: "#D1D5DB",
                  textAlign: "center",
                  marginTop: 25,
                  fontSize: 16,
                }}
              >
                Tap card to reveal meaning
              </Text>
            </>
          ) : (
            <View
              style={{
                transform: [{ rotateY: "180deg" }],
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {card.meaning}
              </Text>

              <Text
                style={{
                  color: "#E5E7EB",
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 18,
                }}
              >
                Pronunciation
              </Text>

              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 22,
                  fontWeight: "600",
                }}
              >
                {card.pronunciation}
              </Text>

              <Text
                style={{
                  color: "#D1D5DB",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Tap again to see word
              </Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (index > 0) {
              setIndex(index - 1);
              setShowMeaning(false);
              flipAnim.setValue(0);
            }
          }}
          style={{
            backgroundColor: "#EF4444",
            width: "47%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ⬅ Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (index < vocabulary.length - 1) {
              setIndex(index + 1);
              setShowMeaning(false);
              flipAnim.setValue(0);
            }
          }}
          style={{
            backgroundColor: "#10B981",
            width: "47%",
            padding: 15,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Next ➡
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 25,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 15,
          elevation: 2,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#6B7280",
            fontWeight: "600",
          }}
        >
          Progress: {index + 1}/{vocabulary.length}
        </Text>
      </View>
    </View>
  );
}