import styles from "./ViewButtons.module.scss";
import {cn} from "../../../utils";
import arrow from "../../../images/arrow.svg";
import {ViewButton} from "../ViewButton/ViewButton";
import {useEffect, useRef, useState} from "react";

export function ViewButtons({buttons}) {
    const [currentView, setCurrentView] = useState(null)
    const [corner, setCorner] = useState('left')
    const scrollRef = useRef(null)
    const offsetsRef = useRef([])
    const currentOffsetRef = useRef(0)

    function onScroll() {
        const fullWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 2
        const currentScroll = scrollRef.current.scrollLeft

        offsetsRef.current.forEach((item) => {
            if (currentScroll >= item.offset) {
                let prevOffset = null
                const index = offsetsRef.current.findIndex((elem) => {
                    if (elem.offset >= currentScroll && currentScroll > prevOffset) {
                        return true
                    } else {
                        prevOffset = elem.offset
                        return false
                    }
                })
                if (index !== -1) {
                    currentOffsetRef.current = offsetsRef.current[index].offset
                }
            } else if (currentScroll === 0) {
                currentOffsetRef.current = 0
            }
        })

        if (currentScroll === 0) {
            setCorner('left')
        } else if (currentScroll >= fullWidth) {
            setCorner('right')
        } else {
            setCorner(null)
        }
    }

    useEffect(() => {
        const result = [{offset: 0}]
        scrollRef.current.querySelectorAll('div').forEach((item) => {
            const lastItem = result[result.length - 1].offset ? result[result.length - 1].offset : 0
            result.push({offset: lastItem + item.clientWidth - 14, el: item})
        })
        offsetsRef.current = result
    }, [])


    function move(increase) {
        const index = offsetsRef.current.findIndex((item) => item.offset === currentOffsetRef.current) + increase
        scrollRef.current.scrollTo({
            top: 0,
            left: offsetsRef.current[index].offset,
            behavior: 'smooth'
        });
    }

    function goRight() {
        move(1)
    }

    function goLeft() {
        move(-1)
    }

    return (
        <div className={styles.viewButtonsContainer}>
            {
                corner !== 'left' && (
                    <button className={cn(styles.beforeBtn, styles.btn)} onClick={goLeft}>
                        <img src={arrow} alt="arrow-before"/>
                    </button>
                )
            }
            <div
                ref={scrollRef}
                className={cn(
                    styles.viewButtons,
                    corner === 'right' ? styles.leftBlur : '',
                    corner === 'left' ? styles.rightBlur : '',
                    !corner ? styles.globalBlur : ''
                )}
                onScroll={onScroll}

            >
                {
                    buttons.map(({id, name}) => {
                        return <ViewButton
                            onClick={() => setCurrentView(id)}
                            isActive={currentView === id}
                            key={id}
                        >
                            {name}
                        </ViewButton>
                    })
                }
            </div>
            {
                corner !== 'right' && (
                    <button className={cn(styles.afterBtn, styles.btn)} onClick={goRight}>
                        <img src={arrow} alt="arrow-after"/>
                    </button>
                )
            }
        </div>
    )
}