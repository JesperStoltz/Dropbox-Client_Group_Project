import React, {useState,useRef} from 'react';
import { Dropbox } from 'dropbox';
import {token$, favorites$, updateFavoriteToken} from './store.js';
import { getThumbnails } from './getthumbnails'
import { errorFunction } from './error.js'

const ReNameFolder = (props) => {
  const inputElFolder = useRef(null);
  const clearInputFolder = useRef(null)
  const okBtn = useRef(null)
  const reNameMess = useRef(null)
  const [newUrl, updateNewUrl] = useState("");
  const [rename, updateRename] = useState("");

  let renameInputFolder;

  const option = {
    fetch: fetch,
    accessToken: token$.value
  };
  
  const dbx = new Dropbox(
    option,
  );


const reNameFolder = (e) => {
props.pollUpdateMode(true)
let old = e.target.dataset.path
updateRename(old)

  inputElFolder.current.style.display = "block"
  document.body.style.overflowY = "hidden"
}
const newNameInputFolder = (e) => {
let target = e.target.value

if (target.includes("(") && target.includes(")")){
  okBtn.current.style.pointerEvents = "none"
  okBtn.current.style.background = "gray"
  reNameMess.current.style.display = "block"
}
else{
  okBtn.current.style.pointerEvents = "visible" 
  okBtn.current.style.background = "#029BB5"
  reNameMess.current.style.display = "none"
}

let path = rename.split("/");
let strippedPath = path.slice(0, path.length-1).join("/");

let fixNewname = strippedPath + "/" + target;
updateNewUrl(fixNewname);
}

const addNewNameFolder = (e) => {



    dbx.filesMoveV2({
        from_path: rename,
        to_path: newUrl,
        autorename: false
      })
      .then(response => {

        for (let i=0; i<favorites$.value.length; i++) {
          if (favorites$.value[i].id === response.metadata.id) {
              let newArray = [...favorites$.value];
              newArray[i] = response.metadata;
              updateFavoriteToken(newArray);
          }
        }
        dbx.filesListFolder({
          path: props.folder.substring(5),
        
              }).then(response =>{
                props.thumbnailUpdate([])
                props.dataUpdate(response.entries)
                props.oldDataUpdate(response.entries)
    
                getThumbnails(dbx, response.entries)
                      .then(entries => {   
                        
                        props.thumbnailUpdate(entries)
                        })
                        .catch(function(error) {
                          errorFunction(error, props.updateErrorMessage)
                          console.log('RenameFolder Thumbnails rad 90');
                        });
                
              })
              .catch(function(error) {
                errorFunction(error, props.updateErrorMessage)
                console.log('RenameFolder Fileslistfolder rad 96');
              });
      })
      .catch(error => {
        errorFunction(error, props.updateErrorMessage)
        console.log('RenameFolder FilesMoveV2 rad 101');
      });

inputElFolder.current.style.display = "none"
document.body.style.overflowY = "auto"
clearInputFolder.current.value = "";
props.pollUpdateMode(false)
props.updateErrorMessage('')

}
const addNewNameCloseFolder = () =>{
inputElFolder.current.style.display = "none"
document.body.style.overflowY = "auto"
props.pollUpdateMode(false)
props.updateErrorMessage('')
}

renameInputFolder = 
<div ref={inputElFolder} className="reNameBack">
<div className="listRenameInput"><h3 className="movefiles-h3">Rename folder</h3>
<div className="renamefile-input-wrapper"><span className="listRenameClose" onClick={addNewNameCloseFolder}><i className="material-icons">close</i></span><input placeholder="New foldername..." className="listRenameInputText" style={{outline: "none"}} ref={clearInputFolder} type="text" onChange={newNameInputFolder} /><button ref={okBtn} className="renamefile-ok-button" style={{outline: "none"}} onClick={addNewNameFolder}>Ok</button></div></div><div ref={reNameMess} className="renameFoldeEerrorMess">No folder name whit ( ) !</div></div>


return(
  <>
  {renameInputFolder}
  <button className="listBtn" onClick={reNameFolder}><i data-path={props.path} className="material-icons rename-icon">edit</i></button>  
  </>
)

}

export default ReNameFolder;
