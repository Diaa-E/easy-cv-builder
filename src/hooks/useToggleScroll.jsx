import { useEffect } from "react";

export default function useToggleScroll(lock = false)
{
    useEffect(() => {

        if (lock)
        {
            document.body.classList.add("lock-scroll");
        }
        else
        {
            document.body.classList.remove("lock-scroll");
        }

    }, [lock])
}