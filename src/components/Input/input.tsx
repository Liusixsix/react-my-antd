import React, { InputHTMLAttributes, ReactElement,ChangeEvent } from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon, { IconProps } from '../Icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
    disabled?:boolean
    size?:InputSize
    icon?:IconProps
    prepend?:string | ReactElement
    append?:string | ReactElement
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps> = (props)=>{
    const {disabled,size,icon,prepend,append,style,className,...restProps} = props

    const classes = classNames('viking-input-wrapper',{
        [`input-size-${size}`]:size,
        'is-disabled':disabled,
        'input-group':prepend || append,
        'input-group-append': !!append,
        'input-group-prepend':!!prepend
    })

    const fixControlledValue = (value:any)=>{
        if(typeof value === 'undefined' || value === null){
            return ''
        }
        return value
    }

    if('value' in props){
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }

    return (
        <div className={classes} style={style}>
            {prepend && <div className='viking-input-group-prepend'>{prepend}</div>}
            {/* {icon && <div className='icon-wrapper'><Icon icon={icon}></Icon></div>} */}
            <input className='viking-input-inner' disabled={disabled} {...restProps} />
            {append && <div className='viking-input-group-append'>{append}</div>}
        </div>
    )
}

export default Input