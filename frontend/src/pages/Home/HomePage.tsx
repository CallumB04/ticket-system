import { useTheme } from "../../hooks/useTheme";

const HomePage = () => {
    // get light or dark mode theme
    const { theme, toggleTheme } = useTheme();

    return (
        <main>
            <p className="text-text-primary">Home Page</p>
            <span className="flex gap-2">
                <button
                    onClick={toggleTheme}
                    className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text h-12 w-50 cursor-pointer rounded"
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>

                <button
                    onClick={toggleTheme}
                    className="bg-btn-primary-disabled text-btn-primary-disabled-text h-12 w-50 rounded"
                    disabled
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>
            </span>
            <span className="mt-2 flex gap-2">
                <button
                    onClick={toggleTheme}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary-border hover:border-btn-secondary-hover-border h-12 w-50 cursor-pointer rounded border-2"
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>
                <button
                    onClick={toggleTheme}
                    className="bg-btn-secondary-disabled text-btn-secondary-disabled-text border-btn-secondary-disabled-border h-12 w-50 rounded border-2"
                    disabled
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>
            </span>
            <span className="mt-2 flex gap-2">
                <button
                    onClick={toggleTheme}
                    className="bg-btn-danger hover:bg-btn-danger-hover text-btn-danger-text h-12 w-50 cursor-pointer rounded"
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>
                <button
                    onClick={toggleTheme}
                    className="bg-btn-danger-disabled text-btn-danger-disabled-text h-12 w-50 rounded"
                    disabled
                >
                    Enable {theme === "dark" ? "Light" : "Dark"} theme
                </button>
            </span>
            <div className="bg-surface mt-2 size-20 rounded"></div>
        </main>
    );
};

export default HomePage;
