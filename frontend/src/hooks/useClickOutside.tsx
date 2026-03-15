import { useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    onClickOutside: () => void
) => {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!ref.current) return;

            if (!ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }

        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mousedown", handleClick);
        };
    }, [ref, onClickOutside]);
};

export default useClickOutside;
