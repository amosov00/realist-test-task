import {Polygon} from "react-yandex-maps";
import {useEffect, useState} from "react";
import {getPolygonCentroid, getColor} from "../utils";



export function District({data, ymaps, map, zoom, onClick}) {

    const [center, setCenter] = useState([0, 0])
    const [marker, setMarker] = useState(null)

    useEffect(() => {
        const formattedCords = data.polygon.map(([x, y]) => {
            return {x, y}
        })
        const center = getPolygonCentroid(formattedCords)
        setCenter([center.x, center.y])

    }, [])

    function createMarker() {
        if (map.current && ymaps) {
            const squareLayout = ymaps.templateLayoutFactory.createClass(
                `
                    <div class="placemark_wrapper">
                        <div 
                            class="placemark" 
                            style="background-color: ${getColor(data.exposition_stats.color_index_median_price)[1]}"
                        >
                            ${data.exposition_stats.rank_index_median_price} AED
                        </div>
                    </div>
                `
            );
            const squarePlacemark = new ymaps.Placemark(center, {}, {iconLayout: squareLayout});
            map.current.geoObjects.remove(marker);
            map.current.geoObjects.add(squarePlacemark);
            setMarker(squarePlacemark)
        }
    }

    useEffect(() => {
        createMarker()
    }, [map, ymaps, data, center])

    useEffect(() => {
        if (zoom < 13) {
            setMarker(null)
            map.current.geoObjects.remove(marker);
        } else {
            createMarker()
        }
    }, [zoom])




    return (
        <>
            <Polygon
                geometry={[
                    data.polygon
                ]}
                onClick={() => onClick(data)}
                options={{
                    fillColor: getColor(data.exposition_stats.color_index_median_price)[0],
                    strokeColor: getColor(data.exposition_stats.color_index_median_price)[1],
                    strokeWidth: 1,
                }}
            />
        </>
    )
}