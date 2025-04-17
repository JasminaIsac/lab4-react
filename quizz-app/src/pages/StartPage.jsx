import { useQuizOptionsContext } from "@context/QuizOptionsContext";
import { useUserContext } from "@context/UserContext";
import { useThemeContext } from "@context/ThemeContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelWithInput from "@/components/LabelWithInput";
import LabelWithSelect from "@/components/LabelWithSelect";
import ToggleTheme from "@/components/ToggleTheme";
import Button from "@/components/Button";

export default function StartPage() {
  const { updateUserName, updateUserScore, setUserAnswers, userAnswers } = useUserContext();
  const { theme, toggleTheme } = useThemeContext();
  const { shuffle, timeLimit, updateShuffle, updateTimeLimit } = useQuizOptionsContext();

  const [name, setName] = useState("");
  const [shuffleOption, setShuffleOption] = useState(shuffle ? "true" : "false");
  const [timeLimitOption, setTimeLimitOption] = useState(timeLimit);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    updateUserScore(0);
    setUserAnswers([]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!(name).trim()) {
      setErrorMessage("Numele nu poate fi gol");
      return;
    }
    const nameRegex = /^[a-zA-ZăâîșțĂÂÎȘȚ\s'-]+$/;


    if (!nameRegex.test(name)) {
      setErrorMessage("Numele trebuie să conțină doar litere.");
      return;
    }

    updateUserName( name );
    updateShuffle(shuffleOption === "true");
    updateTimeLimit( timeLimitOption );
    navigate("/QuizPage");

  };

const timeOptions = [];
  for (let i = 0; i <= 60; i += 5) {
    timeOptions.push({ label: `${i === 0 ? "Nelimitat" : i + " secunde"}`, value: i });
  }


  return (
    <div
    className={`min-h-screen flex flex-col items-center justify-center ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-purple-50 text-black"
    } transition-all duration-300`}
  >
      <ToggleTheme theme = {theme} onClick = {toggleTheme} />

      <h1 className="text-4xl font-bold mb-6 text-center text-purple-500">
        Începe Quiz-ul
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className={`space-y-6 p-6 border border-purple-300 rounded-xl shadow-xl ${theme === "dark" ? "bg-gray-700" : "bg-white"} w-full max-w-lg`}
      >

        <LabelWithInput 
          id="name"
          title="Numele tău:"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Introdu numele tău"
        />

        <LabelWithSelect
          id="shuffle"
          value={shuffleOption}
          title="Ordine aleatorie a întrebărilor?"
          onChange={(e) => setShuffleOption(e.target.value)}
          options={[
            {label: "Da", value: "true"},
            {label: "Nu", value: "false"}
          ]}
        />

        <LabelWithSelect
          id="timeLimit"
          title="Timp limită per întrebare:"
          value={timeLimitOption}
          onChange={(e) => setTimeLimitOption(parseInt(e.target.value))}
          options={timeOptions}
        />

        <Button
          title = "Începe Quiz-ul"
          wFull={true}
          handleClick = {handleSubmit}
        />
      </form>
    </div>
  );
}
