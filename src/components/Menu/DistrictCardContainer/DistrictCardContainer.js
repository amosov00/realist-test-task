import {DistrictCard} from "../DistrictCard/DistrictCard";
import styles from "./DistrictCardContainer.module.scss"

export function DistrictCardContainer({data}) {
    return (
        <div className={styles.container}>
            {
                data.map(({color, price, title, id}) => {
                    return <DistrictCard
                        color={color}
                        price={price}
                        title={title}
                        key={id}
                    />
                })
            }
        </div>
    )
}