import sun from "@assets/images/sun.png";
import moon from "@assets/images/moon.png";

export default function ToggleTheme({ theme, onClick }) {
  const isDark = theme === "dark";

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={onClick}
        className="w-16 h-8 flex items-center rounded-full px-1 transition-colors duration-300 bg-yellow-300 dark:bg-purple-800 shadow-sm"
      >
        <div
          className="w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out translate-x-0 dark:translate-x-8 bg-white"
        >
          <img
            src={isDark ? moon : sun}
            alt="theme icon"
            className="w-full h-full object-contain p-1"
          />
        </div>
      </button>
    </div>
  );
}
