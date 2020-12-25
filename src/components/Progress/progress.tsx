import React from 'react'
import { ThemeProps } from '../Icon'

export interface ProgressProps{
    percent:number
    storekeHight?:number
    showText?:boolean
    styles?:React.CSSProperties
    theme?:ThemeProps
}
 
 export const Progress :React.FC<ProgressProps> = (props)=>{
    const {percent,storekeHight,showText,styles,theme} = props
    return (
        <div className='viking-progress-bar' style={styles}>
            <div className='viking-progress-bar-outer' style={{height:`${storekeHight}px`}}>
                <div className={`viking-progress-bar-inner color-${theme}`}
                    style={{width:`${percent}%`}}
                >
                    {showText && <span className='inner-text'>{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}


Progress.defaultProps = {
    storekeHight:15,
    showText:true,
    theme:'primary'
}