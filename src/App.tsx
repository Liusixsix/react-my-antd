import React, { useState } from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/item";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon";
import Input from "./components/Input/input";
import AutoComplete,{DataSoureceType} from "./components/AutoComplete/AutoComplete";
import { Upload } from "./components/Upload/Upload";

function App() {

  const [val,setVal] = useState<any>()



  const handleFetch = (query:string)=>{
    return fetch(`https://api.github.com/search/users?q=${query}`).then(res=>res.json())
            .then(({items})=>{
              return items.slice(0,10).map((item:any)=>({value:item.login,...item}))
            })
   
  }
  const handleSelect = (item:any)=>{
    // console.log(str)
    setVal(item)
  }
  const renderOption = (item:DataSoureceType<any>)=>{
    return <span>name : {item.value}</span>
  }

  const filePromise = (file:File)=>{
    const newFile = new File([file],'newname.jpg',{type:file.type})
    return Promise.resolve(newFile)
  }

  const checkFileSize = (file:File)=>{
    if(file.size >2140000){
      return false
    }
    return true
  }

  return (
    <div className="App">
      <Button disabled>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        hello
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        hello
      </Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>
        hello
      </Button>
      <Button btnType={ButtonType.Link} href="/">
        hellp
      </Button>
      <Icon icon="coffee" theme="danger" size="10x"></Icon>
      <Menu
        mode="vertical"
        defaultOpenSubMenus={["2"]}
        defaultIndex={"0"}
        onSelect={(index) => alert(index)}
      >
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <SubMenu title="测试">
          <MenuItem>cool link3</MenuItem>
          <MenuItem>cool link4</MenuItem>
        </SubMenu>
      </Menu>
      {/* <Input  append={'22'} placeholder='测试input' prepend={'前缀'} onChange={e=>setVal(e.target.value)}></Input> */}
    
    <AutoComplete renderOption={renderOption} value={val} fetchSuggestions={handleFetch} onSelect={handleSelect}></AutoComplete>
    <Upload 
        action='https://jsonplaceholder.typicode.com/posts/'
        accept='.jpg'
        multiple
        drag
        // beforeUpload={checkFileSize} 
        // onChange={action('change')}
        // onProgress={}
        // onSuccess={}
        // onError={}
       >
           <Button btnType={ButtonType.Primary} >
          上传 upload
      </Button>
    </Upload>
    </div>
  );
}

export default App;
