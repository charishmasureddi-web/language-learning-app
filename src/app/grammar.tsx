import { ScrollView, Text, View } from "react-native";

export default function GrammarScreen() {
  const lessons = [
    {
      title: "Greetings",
      content:
        "Hola = Hello\nBuenos días = Good Morning\nBuenas noches = Good Night",
    },
    {
      title: "Polite Expressions",
      content:
        "Gracias = Thank You\nPor Favor = Please\nLo siento = Sorry",
    },
    {
      title: "Gender Rules",
      content:
        "Words ending in 'o' are usually masculine.\nWords ending in 'a' are usually feminine.",
    },
    {
      title: "Basic Sentences",
      content:
        "Yo soy estudiante = I am a student\nElla es doctora = She is a doctor",
    },
    {
      title: "Common Verbs",
      content:
        "Ser = To Be\nTener = To Have\nIr = To Go",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        ✍️ Grammar Lessons
      </Text>

      {lessons.map((lesson, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 18,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            {lesson.title}
          </Text>

          <Text
            style={{
              lineHeight: 24,
              color: "#374151",
            }}
          >
            {lesson.content}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}