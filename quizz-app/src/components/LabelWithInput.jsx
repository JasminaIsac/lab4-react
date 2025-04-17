import { useThemeContext } from "@/context/ThemeContext";

export default function LabelWithInput({ ...props }) {
    const {id, title, type, value, onChange, placeholder} = props;
    
    return(
        <div className="space-y-2">
        <label htmlFor={id} className="block text-lg text-purple-800 dark:text-purple-300">{title}</label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-purple-300 bg-purple-50 text-gray-900 dark:text-white dark:bg-gray-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
          placeholder={placeholder}
          min={type === "number" ? 0 : undefined}
          max={type === "number" ? 60 : undefined}
        />
      </div>
    )
}
