import { useSelector } from "react-redux"

export default function ThemeProvider({ children }) {
    const theme = useSelector((state) => state.theme.theme)
    return (
        <div className={theme}>
            <div className="bg-[#f5f5f5] text-gray-700 dark:text-gray-200 dark:bg-[rgb(33,34,45)] min-h-screen">
                {children}
            </div>
        </div>
    )
}
