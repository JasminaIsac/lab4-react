import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userScore, setUserScore] = useState(0);

  const updateUserName = (newName) => {
    setUserName(newName);
  };

  const updateUserScore = (newScore) => {
    setUserScore(newScore);
  }

  return (
    <UserContext.Provider value={{ userName, userScore, updateUserName, updateUserScore }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
    const context = useContext(UserContext);
    return context;
  }
  