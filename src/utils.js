export function cn(...args) {
    return args.join(' ');
}

export function getPolygonCentroid(pts) {
    let first = pts[0], last = pts[pts.length-1];
    if (first.x !== last.x || first.y !== last.y) pts.push(first);
    let twiceArea = 0,
        x=0, y=0,
        nPts = pts.length,
        p1, p2, f;
    for ( let i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x*p2.y - p2.x*p1.y;
        twiceArea += f;
        x += ( p1.x + p2.x ) * f;
        y += ( p1.y + p2.y ) * f;
    }
    f = twiceArea * 3;
    return { x:x/f, y:y/f };
}

export function formatNumber(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export function getColor(index) {
    if (index >= 0 && index <= 3) {
        return ['rgba(0, 172, 255, 0.5)', 'rgba(0, 77, 255, 1)']
    } else if (index >= 4 && index <= 6) {
        return ['rgba(155, 53, 197, 0.5)', 'rgba(146, 22, 197, 1)']
    } else {
        return ['rgba(252, 84, 31, 0.5)', 'rgba(252, 84, 31, 1)']
    }
}



export function kitcut(text = "", limit) {
    text = text.trim();
    if( text.length <= limit) return text;
    text = text.slice( 0, limit);
    let lastSpace = text.lastIndexOf(" ");
    if( lastSpace > 0) {
        text = text.substr(0, lastSpace);
    }
    return text + "...";
}
