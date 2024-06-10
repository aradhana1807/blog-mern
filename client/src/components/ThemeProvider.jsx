import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme}>
      <div className="bg-[#f8f8f8] text-gray-700 dark:text-gray-200 dark:bg-[#28292c] min-h-screen">
        {children}
      </div>
    </div>
  );
}
