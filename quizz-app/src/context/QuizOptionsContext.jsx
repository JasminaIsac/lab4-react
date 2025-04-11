import { createContext, useContext, useState } from "react";

const QuizOptionsContext = createContext();

export function QuizOptionsProvider({ children }) {
  const [shuffle, setShuffle] = useState(true);
  const [timeLimit, setTimeLimit] = useState(10);  

  const updateShuffle = (newShuffle) => setShuffle(newShuffle);
  const updateTimeLimit = (newTimeLimit) => setTimeLimit(newTimeLimit);

  return (
    <QuizOptionsContext.Provider value={{ shuffle, timeLimit, updateShuffle, updateTimeLimit }}>
      {children}
    </QuizOptionsContext.Provider>
  );
}

export function useQuizOptionsContext() {
  const context = useContext(QuizOptionsContext);
  return context;
}
