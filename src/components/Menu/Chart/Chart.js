import {useEffect} from "react";
import { LineChart } from 'chartist';
import 'chartist/dist/index.css';

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [2, 2, 4, 2, 0]
    ]
};

 export function Chart() {
     useEffect(()=> {
         new LineChart('.ct-chart', data, {
             fullWidth: true,
             showPoint: false,
             height: '200px',
             axisX: {
                 labelInterpolationFnc: () => null
             },
             chartPadding: {
                 right: 40
             }
         });
     }, [])

    return (
        <div className="ct-chart"/>
    )
}