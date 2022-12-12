import styles from './Information.module.scss'
import {cn} from "../../../utils";

export function Information({ads, price, sqm}) {
    return (
        <div className={styles.information}>
            <div className={cn(styles.title, styles.borderBottom)}>Information</div>
            <div className={cn(styles.block, styles.borderBottom)}>
                <div>Ads count</div>
                <div>{ads}</div>
            </div>
            <div className={cn(styles.block, styles.borderBottom)}>
                <div>Average price</div>
                <div>{price} AED</div>
            </div>
            <div className={cn(styles.block, styles.borderBottom)}>
                <div>Average price sqft</div>
                <div>{sqm} AED</div>
            </div>
        </div>
    )
}