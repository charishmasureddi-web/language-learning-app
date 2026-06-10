import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { quizQuestions } from "../data/quizData";

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = quizQuestions[current];

  const saveQuizResult = async (
    finalScore: number
  ) => {
    try {
      const history =
        await AsyncStorage.getItem("quizHistory");

      const previousHistory = history
        ? JSON.parse(history)
        : [];

      const percentage = Math.round(
        (finalScore / quizQuestions.length) * 100
      );

      previousHistory.push({
        score: finalScore,
        percentage,
        date: new Date().toLocaleDateString(),
      });

      await AsyncStorage.setItem(
        "quizHistory",
        JSON.stringify(previousHistory)
      );

      await AsyncStorage.setItem(
        "quizScore",
        finalScore.toString()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = async (option: string) => {
    let newScore = score;

    if (option === question.answer) {
      newScore += 1;
      setScore(newScore);
    }

    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      await saveQuizResult(newScore);

      const percentage = Math.round(
        (newScore / quizQuestions.length) * 100
      );

      setCompleted(true);

      Alert.alert(
        "🎉 Quiz Completed",
        `Score: ${newScore}/${quizQuestions.length}\nPercentage: ${percentage}%\n\nCheck your Progress Dashboard.`
      );
    }
  };

  if (completed) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#F3F4F6",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          🎉 Quiz Completed
        </Text>

        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Your results have been saved.
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Open Progress to view your statistics.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Question {current + 1} of {quizQuestions.length}
      </Text>

      <View
        style={{
          backgroundColor: "white",
          padding: 25,
          borderRadius: 20,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {question.question}
        </Text>
      </View>

      {question.options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleAnswer(option)}
          style={{
            backgroundColor: "#4F46E5",
            padding: 16,
            borderRadius: 15,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <Text
        style={{
          textAlign: "center",
          marginTop: 15,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Current Score: {score}
      </Text>
    </View>
  );
}