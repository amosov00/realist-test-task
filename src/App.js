import { YMaps, Map} from 'react-yandex-maps';
import {useEffect, useState, useRef} from "react";
import {District} from "./components/District";
import axios from "axios";
import {Menu} from "./components/Menu/Menu";
import {LeftCard} from "./components/LeftCard/LeftCard";
import {BottomDrawer} from "./components/BottomDrawer/BottomDrawer";
import { useMediaQuery } from 'react-responsive';



const mapState = { center: [25.100902, 55.148907], zoom: 13 };
function App() {
    const [ymaps, setYmaps] = useState(null)
    const [data, setData] = useState([])
    const [timer, setTimer] = useState(null)
    const [zoom, setZoom] = useState(mapState.zoom)
    const [isFull, setIsFull] = useState(true)
    const [showBalloon, setShowBalloon] = useState(false)
    const [selectedDistrict, setSelectedDistrict] = useState({})
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const map = useRef(null);

    useEffect(() => {
        async function getDistricts() {
            const response = await axios.get('https://magic.realiste.io/__pd?format=json&json_action=get_city_area_polygons_public&aglomeration_name=Dubai')
            setData(response.data)
        }
        getDistricts()
    }, [])

    function onExit() {
        setIsFull(true)
        setShowBalloon(false)
        const t =setTimeout(() => {
            setSelectedDistrict({})
        }, 300)
        setTimer(t)
    }

    function onSelect(data) {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
        setSelectedDistrict(data)
        setIsFull(false)
        setShowBalloon(true)
    }

    function fn(e) {
        setZoom(e._cache.newZoom)
    }

    useEffect(() => {
        if (map.current) {
            map.current.events.add('boundschange', fn)
            return () => map.current.events.remove('boundschange', fn)
        }
    }, [map.current])


    useEffect(() => {
        if (!isFull || !showBalloon) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

    }, [isFull, showBalloon])


  return (
    <div className="App">
        <div className="x"></div>
        {
            !isMobile && (
                <LeftCard isShow={showBalloon}>
                    <Menu onExit={onExit} data={selectedDistrict}/>
                </LeftCard>
            )
        }
        {
            isMobile && ymaps && (
                <BottomDrawer isShow={showBalloon} setIsFull={setIsFull} isFull={isFull}>
                    <Menu onExit={onExit} data={selectedDistrict} isMobile={true} setIsFull={setIsFull} isFull={isFull}/>
                </BottomDrawer>
            )
        }
        <YMaps query={{load: "package.full"}} >
            <Map
                state={mapState}
                width="100%"
                height="100vh"
                options={{suppressMapOpenBlock: true}}
                instanceRef={map}
                onLoad={ymaps => setYmaps(ymaps)}
            >
                {
                    data.map((district) => {
                       return (
                           <District
                               data={district}
                               ymaps={ymaps}
                               map={map}
                               key={district.id}
                               zoom={zoom}
                               onClick={onSelect}
                           />
                       )
                    })
                }
            </Map>
        </YMaps>
    </div>
  );
}

export default App;
