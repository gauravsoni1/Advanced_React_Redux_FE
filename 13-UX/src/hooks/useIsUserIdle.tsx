import { useState } from "react"
import { useIdleTimer } from "react-idle-timer";

export const useIsUserIdle = () => {
    const [isUserIdle, setIsUserIdle] = useState(false);

    const { getRemainingTime } = useIdleTimer({
        onIdle: () => setIsUserIdle(true),
        onActive: () => setIsUserIdle(false),
        timeout: 10000
    })


    return { isUserIdle, getRemainingTime }
}