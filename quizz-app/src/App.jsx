import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@context/UserContext';
import { ThemeProvider } from '@context/ThemeContext';
import { QuizOptionsProvider } from '@context/QuizOptionsContext';
import StartPage from '@pages/StartPage';
import QuizPage from '@/pages/QuizPage';
import ResultPage from '@/pages/ResultPage';
import ThemeWrapper from '@components/ThemeWrapper';
import "@/index.css";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <ThemeWrapper>
          <QuizOptionsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/QuizPage" element={<QuizPage />} />
                <Route path="/ResultPage" element={<ResultPage />} />
              </Routes>
            </Router>
          </QuizOptionsProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;