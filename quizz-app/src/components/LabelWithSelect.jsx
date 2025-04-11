import { useThemeContext } from "@/context/ThemeContext";

export default function LabelWithSelect({ ...props }) {
    const { theme } = useThemeContext();
    const {id, title, value, options, onChange} = props;
    
    return(
        <div className="space-y-2">
        <label htmlFor={id} className={`block text-lg ${theme === "dark" ? "text-purple-300" : "text-purple-800"}`}>{title}</label>
        <select
        value={value}
        onChange={onChange}
        className={`w-full p-3 border border-purple-300 ${theme === "dark" ? "bg-gray-500" : "bg-purple-50 text-black"} rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300`}
        >
            {options.map(option => 
            <option key={option.value} value={option.value}>{option.label}</option>
            )}
        </select>
      </div>
    )
}