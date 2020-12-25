import React from 'react'
import Icon from '../Icon';
import { Progress } from '../Progress/progress';
import { UploadFile } from './Upload';

interface UploadListProps{
    fileList:UploadFile[]
    onRemove:(file:UploadFile)=>void
}

export const UploadList:React.FC<UploadListProps> = props=>{
    const {fileList,onRemove}  = props
    return (
        <ul className='viking-upload-list'>
            {
                fileList.map(item=>{
                    return  (
                        <li key={item.uid} className='viking-upload-list-item'>
                        
                            <span className={`file-name file-name-${item.status}`}>
                            <Icon icon='file-alt' theme='secondary'></Icon>
                            {item.name}
                            </span>
                            <span className='file-status'>
                                {item.status === 'loading' && <span>loading...</span>}
                                {item.status === 'success' && <span>success</span>}
                                {item.status === 'error' && <span>error</span>}
                            </span>
                            <span className='file-actions' onClick={()=>onRemove(item)}>X</span>
                            {
                                item.status === 'loading' &&
                                <Progress percent={item.percent || 0} ></Progress>
                            }
                        </li>
                    )
                })
            }
        </ul>
        
    )
}