import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import RepoList from "./components/RepoList";
import { Sun, Moon } from "lucide-react";
import CommitsChart from "./components/commitCharts"
function App() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white flex items-center justify-center px-4">
      {/* Dark Mode Toggle with Icons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="flex items-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-900" />
          )}
        </button>
        <span className="text-sm">{theme === "dark" ? "Dark" : "Light"}</span>
      </div>

      <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          GitHub Activity Tracker
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition"
            onClick={() => setSubmittedUsername(username)}
          >
            Search
          </Button>
        </div>
        {submittedUsername && (
  <>
    <RepoList username={submittedUsername} />
    <CommitsChart username={submittedUsername} />
  </>
)}

      </div>
    </div>
  );
}

export default App;
