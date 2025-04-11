import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "@/context/ThemeContext";
import ToggleTheme from "@/components/ToggleTheme";
import { getUserHistory, addUserHistory } from "@/assets/localStorageHelper";
import Button from "@/components/Button";

export default function ResultPage() {
    const { userName, userScore } = useUserContext();
    const { theme, toggleTheme } = useThemeContext();
    const navigate = useNavigate();
    
    let userHistoryData = getUserHistory();
    console.log(userHistoryData);

    if (userName !== "") {
        addUserHistory(userName, userScore);
    }

return (
    <div
    className={`min-h-screen flex flex-col items-center justify-center ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-900"
    } transition-all duration-300`}
    >
        <ToggleTheme theme = {theme} onClick = {toggleTheme} />
        <h1 className="text-4xl font-bold mb-6 text-purple-500">{userScore >= 5 ? "Felicitări!" : "Mai încearcă!"}</h1>
        <p className="text-lg mb-6 text-slate-900">Ai obținut <span className="text-purple-500 font-bold">{userScore}</span> puncte din <span className="text-purple-500 font-bold">10</span></p>

        <div className={`space-y-6 p-6 mb-8 border border-purple-300 rounded-xl shadow-xl ${theme === "dark" ? "bg-gray-700" : "bg-white"} w-full max-w-lg`}>
            <h2 className="text-2xl text-purple-500 font-semibold mb-4">Istoricul Scorurilor</h2>
            <ul className="space-y-2">
                {userHistoryData.map((entry, index) => (
                    <li key={index} className="text-lg">
                        {entry.userName}: {entry.userScore} puncte
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