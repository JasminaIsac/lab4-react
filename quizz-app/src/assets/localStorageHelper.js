export const getUserHistory = () => {
    const userHistory = localStorage.getItem("userHistory");
    if (userHistory) {
      try {
        return JSON.parse(userHistory);
      } catch (error) {
        console.error("Eroare la parsarea istoricului din localStorage:", error);
        return [];
      }
    }
    return [];
  };
  
  export const saveUserHistory = (userHistory) => {
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
  };
  
  export const addUserHistory = (userName, userScore) => {
    let userHistory = getUserHistory();
  
    const existingIndex = userHistory.findIndex(entry => entry.userName === userName);
  
    if (existingIndex !== -1) {
      if (userScore > userHistory[existingIndex].userScore) {
        userHistory[existingIndex].userScore = userScore;
        saveUserHistory(userHistory);
      }
    } else {
      const userData = { userName, userScore };
      userHistory.push(userData);
      saveUserHistory(userHistory);
    }
  };
  