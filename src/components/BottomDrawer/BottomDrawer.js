import styles from './BottomDrawer.module.scss'
import {cn} from "../../utils";
import {useMemo} from "react";

export function BottomDrawer({children, isShow, setIsFull, isFull}) {

    const position = useMemo(() => {
        if (!isFull) {
            return styles.noFull
        }
        return isShow ? styles.opened : styles.closed
    }, [isShow, isFull])


    return (
        <div
            className={
                cn(
                    styles.BottomDrawer,
                    position
                )
            }
            onClick={(e) => !isFull && setIsFull(true)}
        >
            {children}
        </div>
    )
}