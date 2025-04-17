import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { useThemeContext } from "@/context/ThemeContext";
import { useQuizOptionsContext } from "@/context/QuizOptionsContext";
import questions from "@/assets/data/questions.json";
import QuizCard from "@/components/QuizCard";
import ToggleTheme from "@/components/ToggleTheme";

export default function QuizPage() {
  const { userName, userScore, updateUserScore } = useUserContext();
  const { theme, toggleTheme } = useThemeContext();
  const { shuffle, timeLimit } = useQuizOptionsContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState(questions);

  const navigate = useNavigate();

  const [secondsLeft, setSecondsLeft] = useState(timeLimit);
  const isUnlimited = timeLimit === 0;

  const isTimerActive = useRef(false);

  useEffect(() => {
    if(shuffle) setQuizQuestions(() => [...questions].sort(() => Math.random() - 0.5));
  }, [shuffle]);

  useEffect(() => {
    if (isUnlimited) return;
    isTimerActive.current = true; 

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1 && isTimerActive.current) {
          isTimerActive.current = false;
          handleAnswer(false);
          return timeLimit;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) updateUserScore(() => userScore + 1);
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSecondsLeft(timeLimit);
    } else {
      navigate("/ResultPage");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-purple-100 text--900 dark:bg-gray-900 text-white transition-all duration-300"
    >
    <ToggleTheme theme={theme} onClick={toggleTheme} />

      <h1 className="text-3xl font-bold text-purple-500 mb-8">
        Bun venit, {userName}!
      </h1>
      <p className="mb-8 text-xl font-semibold text-purple-800 dark:text-white">
        Întrebarea {currentQuestionIndex + 1} din {quizQuestions.length}
      </p>

      {!isUnlimited && (
        <div className="mb-4 text-center text-red-500">
          Timp rămas: <span className="font-bold">{secondsLeft}s</span>
        </div>
      )}

      <QuizCard question={currentQuestion} onAnswer={handleAnswer} key={currentQuestion.id} />
    </div>
  );
}