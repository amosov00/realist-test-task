import styles from './Menu.module.scss'
import {ViewButtons} from "./ViewButtons/ViewButtons";
import {RoundedButtons} from "./RoundedButtons/RoundedButtons";
import {DistrictCardContainer} from "./DistrictCardContainer/DistrictCardContainer";
import {Chart} from "./Chart/Chart"
import {Information} from "./Information/Information";
import {BigButton} from "./BitButton/BigButton";
import {formatNumber, kitcut} from "../../utils";

export function Menu({onExit, data, isMobile, setIsFull, isFull}) {
    const viewButtonsData = [
        {id: 0, name: 'Average price'},
        {id: 1, name: 'Average price price'},
        {id: 2, name: 'Sales period period'},
        {id: 3, name: 'Sales period'},
        {id: 4, name: 'Offers'},
    ]

    const roundedButtonData = [
        {id: 0, name: 'ALL'},
        {id: 1, name: '1D'},
        {id: 2, name: '7D'},
        {id: 3, name: '1M'},
        {id: 4, name: '3M'},
        {id: 5, name: '1Y'},
    ]

    const districtCardData = [
        {id: 0, color: '#63C340', title: 'Palm Beach Towers', price: '5 500 000'},
        {id: 1, color: '#3AC8CC', title: 'Royal Atlantis Residences', price: '3 500 000'},
        {id: 2, color: '#D6A100', title: 'The Palm Jumeira', price: '3 500 000'}
    ]

    return (
        <div className={styles.menu} style={!isFull ? {overflow:'hidden'} : {}}>
            {
                isMobile && (
                    <div
                        onClick={() => setIsFull(!isFull)}
                        className={styles.mobileBlind}
                    />
                )
            }
            <button className={styles.closeButton} onClick={onExit}/>
            <div className={styles.head}>{!isMobile ? data?.name : kitcut(data?.name, 17)}</div>
            <ViewButtons buttons={viewButtonsData}/>
            <RoundedButtons data={roundedButtonData}/>
            <div className={styles.priceWrapper}>
                <div className={styles.priceStick}/>
                <div>
                    <span className={styles.price}>{formatNumber(data.exposition_stats?.rank_index_median_price)}</span>
                    <span className={styles.currency}> AED</span>
                </div>
            </div>
            <div className={styles.chartWrapper}>
                <Chart/>
            </div>
            <DistrictCardContainer data={districtCardData}/>
            <Information
                ads={data.exposition_stats?.ads_count}
                price={formatNumber(data.exposition_stats?.rank_index_median_price)}
                sqm={formatNumber(data.exposition_stats?.sqm_price_median)}
            />
            <BigButton/>
        </div>
    )
}