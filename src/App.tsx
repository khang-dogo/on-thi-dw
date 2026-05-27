import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, ClipboardCheck } from "lucide-react";
import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import rawQuestions from "./data/questions.json";
import { normalizeQuestionData } from "./lib/dataHealth";
import { readProgress, type StudyProgress, writeProgress } from "./lib/storage";
import { QuizPage } from "./pages/QuizPage";
import { StudyPage } from "./pages/StudyPage";

export default function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;
  const data = useMemo(() => normalizeQuestionData(rawQuestions), []);
  const initialProgress = useMemo(() => readProgress(), []);
  const [progress, setProgress] = useState<StudyProgress>(initialProgress.progress);
  const [storageError, setStorageError] = useState<string | undefined>(initialProgress.error);

  const updateProgress = useCallback((updater: (progress: StudyProgress) => StudyProgress) => {
    setProgress((current) => {
      const next = updater(current);
      const error = writeProgress(next);
      setStorageError(error);
      return next;
    });
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <div className="app-shell">
        <header className="topbar">
          <NavLink to="/study" className="brand" aria-label="Về màn ôn tập">
            <span className="brand-mark">DW</span>
            <span>
              <strong>Ôn tập trắc nghiệm</strong>
              <small>{data.questions.length} câu đã sẵn sàng</small>
            </span>
          </NavLink>
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            <NavItem to="/study" icon={<BookOpen size={18} />} label="Ôn tập" />
            <NavItem to="/quiz" icon={<ClipboardCheck size={18} />} label="Làm bài" />
          </nav>
        </header>

        {storageError ? (
          <div className="storage-alert" role="status">
            {storageError}
          </div>
        ) : null}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/study" replace />} />
            <Route
              path="/study"
              element={<StudyPage data={data} progress={progress} updateProgress={updateProgress} />}
            />
            <Route
              path="/quiz"
              element={<QuizPage data={data} progress={progress} updateProgress={updateProgress} />}
            />
          </Routes>
        </main>

        <nav className="bottom-nav" aria-label="Điều hướng chính">
          <NavItem to="/study" icon={<BookOpen size={19} />} label="Ôn tập" />
          <NavItem to="/quiz" icon={<ClipboardCheck size={19} />} label="Làm bài" />
        </nav>
      </div>
    </BrowserRouter>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
