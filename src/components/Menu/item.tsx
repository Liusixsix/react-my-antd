import React, { useContext } from 'react'
import classnames from 'classnames'
import  { MenuContext } from './Menu'

export interface MenuItemProps{
    index?:string
    disabled?:boolean
    className?:string
    style?:React.CSSProperties
}

const MenuItem:React.FC<MenuItemProps> =(props)=>{
    const {index,disabled,className,style,children} = props

    const context = useContext(MenuContext)

    const classes = classnames('menu-item',className,{
        'is-disabled':disabled,
        'is-active':context.index === index
    })

    const hanldeClick = ()=>{
        if(context.onSelect && !disabled &&  (typeof index === 'string') ){
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={hanldeClick}>{children}</li>
    )

}
// MenuItem
MenuItem.displayName = 'MenuItem'
export default MenuItem