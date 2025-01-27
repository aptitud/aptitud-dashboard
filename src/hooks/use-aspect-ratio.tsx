import { useEffect, useState } from "react";

function useAspectRatio() {
    const [aspectRatio, setAspectRatio] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setAspectRatio(window.innerWidth / ((window.innerHeight - 100) / 2));
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return aspectRatio;
}

export default useAspectRatio;
