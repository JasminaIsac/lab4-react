import { useState } from "react";
import Button from "./Button";
import { useThemeContext } from "@/context/ThemeContext";
import { useUserContext } from "@/context/UserContext";

export default function QuizCard({ question, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const { updateUserAnswers } = useUserContext();

  const difficultyClass =
  question.dificultate === "Ușor"
    ? "bg-green-200 text-green-800"
    : question.dificultate === "Mediu"
    ? "bg-yellow-200 text-yellow-800"
    : "bg-red-200 text-red-800";

    function handleAnswer() {
      if (selectedOption !== null) {
        const isCorrect = selectedOption === question.corect;
        
        updateUserAnswers({
          index: question.id,
          raspuns: selectedOption,
        });

        onAnswer(isCorrect);
      }
    };


  return (
    <div className="bg-white dark:bg-gray-700 border border-purple-300 rounded-2xl shadow-xl p-6 transition-all duration-300 w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between text-sm text-purple-600 dark:text-purple-300">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyClass} `}>
          Dificultate: {question.dificultate}
        </span>
        <span className="px-3 py-1 rounded-full bg-purple-200 dark:text-purple-800 italic">{question.categorie}</span>
      </div>

      <h2 className="text-purple-600 dark:text-purple-300 text-2xl font-bold mb-6 text-center">
        {question.intrebare}
      </h2>

      <form className="space-y-4">
        <ul className="space-y-2">
          {Object.entries(question.optiuni).map(([key, value]) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => setSelectedOption(key)}
                className={`
                  w-full text-left px-4 py-3 border rounded-lg bg-purple-50 hover:bg-purple-100 text-bold text-purple-800 border border-purple-300 
                  dark:hover:bg-gray-500 dark:text-white
                  ${selectedOption === key ? "border-3 border-purple-500 font-semibold bg-purple-200 dark:bg-gray-500" : "border-purple-300 dark:bg-gray-600"} 
                  transition-all duration-100 ease-in-out
                  `}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </form>
      <Button 
        title="Answer" 
        handleClick={handleAnswer}
        />
    </div>
  );
}
