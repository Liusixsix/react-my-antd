import React, { useContext, useState } from 'react'
import classnames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './item'

export interface SubMenuProps{
    index?:string
    title:string
    className?:string
}

const SubMenu:React.FC<SubMenuProps> = ({index,title,className,children})=>{
    
    const context = useContext(MenuContext)
    const openSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode ==='vertical') ? openSubMenus.includes(index):false
    const [menuOpen,setOpen] = useState(isOpend)
    
    const classes = classnames('menu-item submenu-item',className,{
        'is-active':context.index === index
    })
    const handleClick = (e:React.MouseEvent)=>{
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer:any
    const handleMouse = (e:React.MouseEvent,toggle:boolean)=>{
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }

    const clickEvents = context.mode === 'vertical' ?{
        onClick:handleClick
    }:{}

    const hoverEvents = context.mode !== 'vertical'?{
        onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
        onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)}
    }:{}

    const renderChildren = ()=>{
        const subMenuClasses = classnames('viking-submenu',{
            'menu-opend':menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('错误节点')
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'subMenu'
export default SubMenu