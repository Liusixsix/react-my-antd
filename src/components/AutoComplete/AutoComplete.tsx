import React, { ChangeEvent, ReactElement, useEffect, useState ,KeyboardEvent, useRef} from 'react'
import classNames from 'classnames'
import Input,{InputProps} from '../Input/input'
import Icon from '../Icon/index'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutsode } from '../../hooks/useClickOutside'
interface DataSourceObject{
    value:string
}
export type DataSoureceType<T={}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit <InputProps,'onSelect'>{
    fetchSuggestions:(str:string)=>DataSoureceType[] | Promise<DataSoureceType[]>
    onSelect?:(item:DataSoureceType)=>void
    renderOption?:(item:DataSoureceType)=>ReactElement
}


 const AutoComplete:React.FC<AutoCompleteProps> = props=>{
    const {fetchSuggestions,onSelect,value,renderOption,...restProps} = props

    const [inputValue,setInputValue] = useState(value as string)
    const [suggestions,setSuggestions] = useState<DataSoureceType[]>([])
    const [loading,setLoading] = useState(false)
    const [highlightIndex,setHighlightIndex] = useState(-1)
    const  triggerFlag = useRef(false)
    const componentRef = useRef(null)

    const debouncedValue =  useDebounce(inputValue)
           
    useClickOutsode(componentRef,(e:any)=> setSuggestions([]))

    useEffect(()=>{
        if(debouncedValue && triggerFlag.current){
            const result = fetchSuggestions(debouncedValue)
            if(result instanceof Promise){
                setLoading(true)
                result.then(data=>{
                    setLoading(false)
                    setSuggestions(data)
                })
            }else{
                setSuggestions(result)
            }
        }else{
            setSuggestions([])
        }
        setHighlightIndex(-1)
    },[debouncedValue])

    const highlight = (index:number)=>{
        if(index<0)index = 0
        if(index>=suggestions.length){
            index = suggestions.length -1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>)=>{

        switch(e.keyCode){
            case 13:
                if(suggestions[highlightIndex]){
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex -1 )
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                    break
                    default:
        }
    }

    const handelChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.trim()
        setInputValue(value)
        triggerFlag.current = true
    }

    const handleSelect = (item:DataSoureceType)=>{
            setInputValue(item.value)
            setSuggestions([])
            if(onSelect){
                onSelect(item)
            }
            triggerFlag.current = false
    }


    const renderTemplate = (item:DataSoureceType)=>{
        return renderOption?renderOption(item):item
    }

    const generateDrodown = ()=>{
        return (
            <ul>
                {suggestions.map((item,index)=>{
                     const classes  = classNames('suggestion-item',{
                        'item-highlighted':index === highlightIndex
                    }) 
                    return (
                        <li className={classes} key={index} onClick={()=>handleSelect(item)}>{renderTemplate(item)}</li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className='viking-auto-complete' ref={componentRef}>
            <Input value={inputValue} onChange={handelChange} onKeyDown={handleKeyDown} {...restProps}></Input>
            {loading && <ul>loading...</ul>}
            {suggestions.length>0 && generateDrodown()}
        </div>
    )
}

export default AutoComplete