import { useThemeContext } from "@/context/ThemeContext";

export default function QuizCard({ question, onAnswer }) {
  const { theme } = useThemeContext();

  const difficultyClass =
  question.dificultate === "Ușor"
    ? "bg-green-200 text-green-800"
    : question.dificultate === "Mediu"
    ? "bg-yellow-200 text-yellow-800"
    : "bg-red-200 text-red-800";

  return (
    <div className={`${theme === "dark" ? "bg-gray-600" : "bg-white"} border border-purple-200 dark:border-purple-700 rounded-2xl shadow-xl p-6 transition-all duration-300 w-full max-w-2xl mx-auto`}>
      <div className="mb-4 flex justify-between text-sm text-purple-600 dark:text-purple-300">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyClass} `}>
          Dificultate: {question.dificultate}
        </span>
        <span className="px-3 py-1 rounded-full bg-purple-200 italic">{question.categorie}</span>
      </div>

      <h2 className={`${theme === "dark" ? "text-purple-300" : "text-purple-800"} text-2xl font-bold mb-6 text-center`}>
        {question.intrebare}
      </h2>

      <form className="space-y-4">
        <ul className="space-y-2">
          {Object.entries(question.optiuni).map(([key, value]) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => onAnswer(key === question.corect)}
                className={`${theme === "dark" ? "bg-gray-500 hover:bg-gray-400" : "bg-purple-50 text-black hover:bg-purple-100"} w-full text-left px-4 py-3 border border-purple-300 rounded-lg focus:ring-purple-300 focus:border-purple-300 transition-all duration-200`}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
