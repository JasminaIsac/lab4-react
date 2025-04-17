import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "@/context/ThemeContext";
import ToggleTheme from "@/components/ToggleTheme";
import { getUserHistory, addUserHistory } from "@/assets/localStorageHelper";
import Button from "@/components/Button";
import questions from "@/assets/data/questions.json";

export default function ResultPage() {
    const { userName, userScore, userAnswers } = useUserContext();
    const { theme, toggleTheme } = useThemeContext();
    const navigate = useNavigate();
    let userHistoryData = getUserHistory();

    if (userName !== "") {
        addUserHistory(userName, userScore);
    }

return (
    <div
    className="min-h-screen flex flex-col items-center justify-center bg-purple-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300 p-8"
    >
        <ToggleTheme theme = {theme} onClick = {toggleTheme} />
        <h1 className="text-4xl font-bold mb-6 text-purple-500">{userScore >= 5 ? "Felicitări!" : "Mai încearcă!"}</h1>
        <p className="text-lg mb-6 text-gray-900 dark:text-white">Ai obținut <span className="text-purple-500 font-bold">{userScore}</span> puncte din <span className="text-purple-500 font-bold">10</span></p>

        <div className="space-y-6 p-8 mb-8 border border-purple-300 rounded-xl shadow-lg bg-white bg-white dark:bg-gray-700 w-full max-w-lg">
        <h2 className="text-2xl text-purple-500 font-semibold mb-4">Detalii răspunsuri</h2>
            <ul className="space-y-4">
                {questions.map((question, index) => {
                    const userAnswerObj = userAnswers.find((ans) => ans.index === index+1);
                    const userAnswerKey = userAnswerObj?.raspuns;
                    const userAnswerText = question.optiuni[userAnswerKey];
                    const correctAnswerText = question.optiuni[question.corect];
                    const isCorrect = userAnswerKey === question.corect;

                    return (
                        <li key={index}>
                        <p className="font-semibold mb-1">{index + 1}. {question.intrebare}</p>
                        <p className="ml-4 text-sm">
                            <span className="font-semibold text-green-600 dark:text-green-400">Răspuns corect:</span> {correctAnswerText}
                        </p>
                        <p className={`ml-4 text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                            <span className="font-semibold">Răspunsul tău:</span> {userAnswerText ?? "Nespecificat"}
                        </p>
                        </li>
                    );
                })}
            </ul>
        </div>

        <div className="space-y-6 p-6 mb-8 border border-purple-300 rounded-xl shadow-lg bg-white dark:bg-gray-700 w-full max-w-lg">
            <h2 className="text-2xl text-purple-500 font-semibold mb-4">Istoricul Scorurilor</h2>
            <ul className="space-y-2">
                {userHistoryData.map((entry, index) => (
                    <li key={index} className="text-lg">
                        <span className="font-semibold">{entry.userName}: </span>{entry.userScore} puncte
                    </li>
                ))}
            </ul>
        </div>

        <Button
            title="Încearcă din nou"
            handleClick={() => navigate("/")}
        />
        </div>
    );
}