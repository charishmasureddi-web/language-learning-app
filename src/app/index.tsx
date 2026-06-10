import { router } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const menuItems = [
    {
      title: "Vocabulary",
      emoji: "📖",
      subtitle: "Browse and search words",
      route: "/vocabulary",
    },
    {
      title: "Grammar",
      emoji: "✍️",
      subtitle: "Learn grammar rules",
      route: "/grammar",
    },
    {
      title: "Flashcards",
      emoji: "🃏",
      subtitle: "Practice with flashcards",
      route: "/flashcards",
    },
    {
      title: "Quiz",
      emoji: "🧠",
      subtitle: "Test your knowledge",
      route: "/quiz",
    },
    {
      title: "Progress",
      emoji: "📊",
      subtitle: "Track achievements",
      route: "/progress",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          padding: 20,
          paddingTop: 60,
        }}
      >
        <View
          style={{
            backgroundColor: "#4F46E5",
            borderRadius: 30,
            padding: 30,
            marginBottom: 25,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 34,
              fontWeight: "bold",
            }}
          >
            🌎 Language Learning
          </Text>

          <Text
            style={{
              color: "#E0E7FF",
              marginTop: 10,
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            Learn Spanish through Vocabulary,
            Grammar Lessons, Flashcards and Quizzes.
          </Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Learning Modules
        </Text>

        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.title}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.85}
            style={card}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 38,
                  marginRight: 15,
                }}
              >
                {item.emoji}
              </Text>

              <View style={{ flex: 1 }}>
                <Text style={title}>
                  {item.title}
                </Text>

                <Text style={subtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 24,
                  color: "#9CA3AF",
                }}
              >
                ›
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const card = {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 24,
  marginBottom: 15,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 5,
};

const title = {
  fontSize: 20,
  fontWeight: "bold" as const,
};

const subtitle = {
  color: "#6B7280",
  marginTop: 4,
};

const statCard = {
  backgroundColor: "white",
  width: "31%",
  padding: 15,
  borderRadius: 20,
  alignItems: "center" as const,

  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 3,
};

const statValue = {
  fontSize: 22,
  fontWeight: "bold" as const,
  color: "#4F46E5",
};

const statLabel = {
  color: "#6B7280",
  marginTop: 5,
};