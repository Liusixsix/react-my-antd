import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button, { ButtonType } from "../Button";
import { UploadList } from "./UploadList";
import { Dragger } from "./dragger";

type UploadFileStatus = "ready" | "loading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?:UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?:(file:UploadFile) =>void
  headers?:{[key:string]:any}
  name?:string
  data?:{[key:string]:any}
  withCredentials?:boolean,
  accept?:string
  multiple?:boolean
  drag?:boolean
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onRemove,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList: any) => {
      return prevList.map((file: UploadFile) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        }
        return file
      });
    });
  };

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };


  const handleRemove = (file:UploadFile)=>{
    setFileList((prevList)=>{
        return prevList.filter(item=>item.uid!==file.uid)
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // setFileList([_file, ...fileList]);
    setFileList(prevList=>{
        return [_file,...prevList]
    })
    const formData = new FormData();
    formData.append(name || 'file', file);

     data&& Object.keys(data).forEach(key=>{
        formData.append(key,data[key])
    })
    
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers
        },
        withCredentials,
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total || 0);
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "loading" });
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res: any) => {
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) onSuccess(res.data, file);
        if (onChange) onChange(file);
      })
      .catch((e) => {
        updateFileList(_file, { status: "error", error: e });
        if (onError) onError(e, file);
        if (onChange) onChange(file);
      });
  };

  return (
    <div className="viking-upload-component">
        <div className='viking-upload-input' style={{display:'inline-block'}} onClick={handleClick}>
            {
                drag?<Dragger onFile={(files)=>uploadFiles(files)}>{children}</Dragger>:children
            }
        </div>
    
      <input
        ref={fileInput}
        type="file"
        className="viking-file-input"
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} ></UploadList>
    </div>
  );
};


