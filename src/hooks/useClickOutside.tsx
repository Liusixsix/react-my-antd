import React,{ RefObject, useEffect } from "react";

export function useClickOutsode(ref:RefObject<HTMLDivElement>,handle:Function){
        useEffect(()=>{
            const listen = (e:MouseEvent)=>{
                if(!ref.current || ref.current.contains(e.target as HTMLElement)) return
                handle(e)
            }   

            document.addEventListener('click',listen)

            return ()=>{
                document.removeEventListener('click',listen)
            }

        },[ref,handle])
}