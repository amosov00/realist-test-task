import styles from './ViewButton.module.scss';
import {cn} from "../../../utils";

export function ViewButton({children, isActive, onClick = () => {}}) {

    return (
        <div
            className={cn(isActive ? styles.active : styles.noActive, styles.button)}
            onClick={() => onClick()}
        >
            {children}
        </div>
    )
}