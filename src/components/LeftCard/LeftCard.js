import styles from './LeftCard.module.scss'
import {cn} from "../../utils";

export function LeftCard({children, isShow}) {
    return (
        <div
            className={
                cn(
                    styles.leftCard,
                    isShow ? styles.opened : styles.closed
                )
            }
        >
            {children}
        </div>
    )
}