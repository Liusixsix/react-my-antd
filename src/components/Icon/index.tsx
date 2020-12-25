import React from 'react'
import classnames from 'classnames'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' |'success' | 'info'  | 'danger' |'light' | 'dark'


export interface IconProps extends FontAwesomeIconProps{
    theme?:ThemeProps
}

const Icon:React.FC<IconProps> = (props)=>{
    const {className,theme,...resetProps} = props
    const classes = classnames('viking-icon',className,`icon-${theme}`)
    return (
        <FontAwesomeIcon className={classes} {...resetProps} ></FontAwesomeIcon>
    )
}

export default Icon