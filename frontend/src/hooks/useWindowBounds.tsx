import { useEffect, useState } from "react";

const useWindowBounds = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // remove listened when hook unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { width, height };
};

export default useWindowBounds;
