import React,{createContext,useState} from 'react'
import classnames from 'classnames'
import { MenuItemProps } from './item'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps{
    defaultIndex?:string
    clasName?:string
    mode?:MenuMode
    style?:React.CSSProperties
    onSelect?:(selectdIndex:string)=>void
    defaultOpenSubMenus?:string[]
}

export interface IMenuContext {
    index:string
    onSelect?:(selectdIndex:string)=>void
    mode?:MenuMode
    defaultOpenSubMenus?:string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

const Menu:React.FC<MenuProps> = (props)=>{
    const {clasName,mode,defaultIndex,style,children,onSelect,defaultOpenSubMenus} = props
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classnames('viking-menu',clasName,{
        'menu-vertical':mode==='vertical',
        'menu-horizontal':mode !== 'vertical'
    })
    const handleClick = (index:string)=>{
        setActive(index)
        if(onSelect){
            onSelect(index)
        }
    }

    const passedContext:IMenuContext = {
        index:currentActive?currentActive:'0',
        onSelect:handleClick,
        mode:mode,
        defaultOpenSubMenus
    }

    const renderChildren = ()=>{
        return React.Children.map(children,(child,index)=>{
           const childElement = child as React.FunctionComponentElement<MenuItemProps>
           const {displayName} =  childElement.type
           if(displayName === 'MenuItem' || displayName === 'subMenu'){
               return React.cloneElement(childElement,{
                   index:index.toString()
               })
           }else{
               console.error('错误的节点')
           }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex:'0',
    mode:'horizontal',
    defaultOpenSubMenus:[]
}

export default Menu