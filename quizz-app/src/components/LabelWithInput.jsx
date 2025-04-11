import { useThemeContext } from "@/context/ThemeContext";

export default function LabelWithInput({ ...props }) {
    const { theme } = useThemeContext();
    const {id, title, type, value, onChange, placeholder} = props;
    
    return(
        <div className="space-y-2">
        <label htmlFor={id} className={`block text-lg ${theme === "dark" ? "text-purple-300" : "text-purple-800"}`}>{title}</label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full p-3 border border-purple-300 ${theme === "dark" ? "bg-gray-500" : "bg-purple-50 text-black"} rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300`}
          placeholder={placeholder}
          min={type === "number" ? 0 : undefined}
          max={type === "number" ? 60 : undefined}
        />
      </div>
    )
}
