import styles from './BigButton.module.scss'
import image from '../../../images/ball.svg'
export function BigButton() {
    return (
        <button className={styles.button}>
            <img src={image} alt="image"/>
            <div>Show apartments</div>
        </button>
    )
}