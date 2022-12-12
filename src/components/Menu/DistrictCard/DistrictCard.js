import styles from './DistrictCard.module.scss'
export function DistrictCard({price, title, color}) {
    return (
        <div className={styles.card}>
            <div style={{backgroundColor: color}} className={styles.stick}/>
            <div>
                <div>{title}</div>
                <div className={styles.price}>{price}</div>
            </div>
        </div>
    )
}