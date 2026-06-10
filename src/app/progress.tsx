import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";
import { quizQuestions } from "../data/quizData";
import { vocabulary } from "../data/vocabulary";

export default function ProgressScreen() {
  const [latestScore, setLatestScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  const loadProgress = async () => {
    try {
      const storedHistory =
        await AsyncStorage.getItem("quizHistory");

      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);

        setHistory(parsedHistory);
        setAttempts(parsedHistory.length);

        const scores = parsedHistory.map(
          (item: any) => item.score
        );

        const latest =
          parsedHistory[parsedHistory.length - 1];

        setLatestScore(latest.score);
        setHighestScore(Math.max(...scores));

        const average =
          scores.reduce(
            (sum: number, score: number) =>
              sum + score,
            0
          ) / scores.length;

        setAverageScore(
          Number(average.toFixed(1))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completionPercentage = Math.round(
    (latestScore / quizQuestions.length) * 100
  );

  let badge = "🌱 Beginner";

  if (highestScore >= 5)
    badge = "📘 Learner";

  if (highestScore >= 10)
    badge = "🎯 Intermediate";

  if (highestScore >= 15)
    badge = "🏆 Advanced";

  if (highestScore >= quizQuestions.length)
    badge = "👑 Language Master";

  const courseCompleted =
    highestScore >=
    Math.floor(quizQuestions.length * 0.8);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 25,
          color: "#111827",
        }}
      >
        📊 Learning Dashboard
      </Text>

      <View style={card}>
        <Text style={title}>
          📖 Total Vocabulary Words
        </Text>
        <Text style={value}>
          {vocabulary.length}
        </Text>
      </View>

      <View style={card}>
        <Text style={title}>
          🧠 Latest Quiz Score
        </Text>
        <Text style={value}>
          {latestScore}/{quizQuestions.length}
        </Text>
      </View>

      <View style={card}>
        <Text style={title}>
          🏆 Highest Score
        </Text>
        <Text style={value}>
          {highestScore}/{quizQuestions.length}
        </Text>
      </View>

      <View style={card}>
        <Text style={title}>
          📈 Average Score
        </Text>
        <Text style={value}>
          {averageScore}
        </Text>
      </View>

      <View style={card}>
        <Text style={title}>
          🔄 Quiz Attempts
        </Text>
        <Text style={value}>
          {attempts}
        </Text>
      </View>

      <View style={card}>
        <Text style={title}>
          ✅ Completion Percentage
        </Text>

        <View
          style={{
            height: 16,
            backgroundColor: "#E5E7EB",
            borderRadius: 20,
            overflow: "hidden",
            marginTop: 12,
          }}
        >
          <View
            style={{
              width: `${completionPercentage}%`,
              height: "100%",
              backgroundColor: "#4F46E5",
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {completionPercentage}%
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#EEF2FF",
          padding: 22,
          borderRadius: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          🏅 Achievement Badge
        </Text>

        <Text
          style={{
            fontSize: 30,
            marginTop: 10,
          }}
        >
          {badge}
        </Text>
      </View>

      {courseCompleted && (
        <View
          style={{
            backgroundColor: "#FEF3C7",
            padding: 25,
            borderRadius: 20,
            marginBottom: 20,
            borderWidth: 2,
            borderColor: "#F59E0B",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🎓 Course Certificate
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              fontSize: 18,
            }}
          >
            Congratulations!
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
            }}
          >
            You have successfully completed
            the Spanish Beginner Course.
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        📝 Quiz History
      </Text>

      {history.length === 0 ? (
        <View style={card}>
          <Text
            style={{
              textAlign: "center",
            }}
          >
            No quiz attempts yet.
          </Text>
        </View>
      ) : (
        history
          .slice()
          .reverse()
          .map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                padding: 18,
                borderRadius: 18,
                marginBottom: 12,
                borderLeftWidth: 5,
                borderLeftColor: "#4F46E5",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Attempt #{history.length - index}
              </Text>

              <Text
                style={{
                  marginTop: 5,
                }}
              >
                Score: {item.score}
              </Text>

              <Text>
                Percentage: {item.percentage}%
              </Text>

              <Text>
                Date: {item.date}
              </Text>
            </View>
          ))
      )}
    </ScrollView>
  );
}

const card = {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 20,
  marginBottom: 12,
};

const title = {
  fontSize: 16,
  fontWeight: "bold" as const,
  color: "#374151",
};

const value = {
  fontSize: 28,
  fontWeight: "bold" as const,
  marginTop: 8,
  color: "#111827",
};