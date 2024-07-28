import { FC, useEffect } from "react";
import { throttle } from 'lodash-es';

const withMouseTracking = (BaseComponent: FC) => {
    return (props: any) => {

        const mouseMovementHandler = (e: MouseEvent) => {
            // console.log(e.clientX, e.clientY);
        }

        // useEffect(() => {
        //     document.addEventListener('mousemove', throttle(mouseMovementHandler, 1000))

        //     return () => {
        //         return document.removeEventListener('mousemove', mouseMovementHandler)
        //     }
        // }, []);

        return <BaseComponent {...props} />
    }
}

export default withMouseTracking;