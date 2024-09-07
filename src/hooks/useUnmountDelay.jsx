import { useState } from "react";

export default function useUnmountDelay(unmountDelayMS)
{
    const [mounted, setmounted] = useState(true);

    function mount(mountCallback = () => {})
    {
        setmounted(true);
        mountCallback();
    }

    function unmount(unmountCallback = () => {})
    {
        setmounted(false);
        setTimeout(unmountCallback, unmountDelayMS)
    }

    return [mounted, mount, unmount];
}