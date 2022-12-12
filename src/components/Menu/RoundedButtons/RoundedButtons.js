import styles from './RoundedButtons.module.scss'
import {useState} from "react";

export function RoundedButtons({data}) {
    const [active, setActive] = useState(null)
    return (
        <div className={styles.buttons}>
            {
                data.map(({id, name}) => {
                    return (
                        <div
                            className={id === active ? styles.active : ""}
                            onClick={() => setActive(id)}
                            key={id}
                        >
                            {name}
                        </div>
                    )
                })
            }
        </div>
    )
}