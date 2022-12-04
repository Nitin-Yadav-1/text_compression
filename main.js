import mainUtils from "./utils/mainUtils.js";

//globals
const compress = {
    fileInput : {
        filesData : [],
        fileInputElement : document.querySelector("#inputGroupFile04"),
        clearBtn : document.querySelector("#inputGroupFileAddon04"),
    },
    textareaInput : document.querySelector("#text-input"),
    compressBtn : document.querySelector("#compress-btn"),
    downloadDiv : document.querySelector("#compress-download"),
}

//event listeners
compress.fileInput.fileInputElement.addEventListener("change", (e) => {
    compress.compressBtn.textContent = "Reading files...";
    compress.compressBtn.disabled = true;
    let promises = [];

    for( let file of e.target.files ){
        let promise = new Promise( (resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(){
                let readResult = {
                    name : file.name,
                    str : reader.result,
                    blob : null,
                }
                resolve(readResult);
            }
            reader.onerror = function(){
                reject("An Error occured while reading the file");
            }
            reader.readAsText(file);
        });
        promises.push(promise);
    }

    Promise.all(promises)
        .then( fileContents => {
            fileContents.forEach( obj => compress.fileInput.filesData.push(obj));
            compress.compressBtn.textContent = "Compress";
            compress.compressBtn.disabled = false;
        })
        .catch( (e) => {
            alert(e);
        });
});

compress.fileInput.clearBtn.addEventListener("click", (e) => {
    compress.fileInput.filesData = [];
    compress.fileInput.fileInputElement.value = null;
});

compress.compressBtn.addEventListener("click", (e) => {
    
    //check if no inputs were given
    if( compress.fileInput.filesData.length === 0 && compress.textareaInput.value === "" ){
        alert("No files and text were given to compress!!");
        return;
    }
    
    //disbale compress btn to prevent accidental further clicks
    e.target.disabled = true;
    e.target.textContent = "Compressing files...";

    //add textarea input to filesData array of objects
    if( compress.textareaInput.value !== "" ){
        let obj = {
            name : "compressed.txt",
            str : compress.textareaInput.value,
            blob : null,
        };
        compress.fileInput.filesData.push(obj);
    }

    //fills the blob property of each object
    mainUtils.compress(compress.fileInput.filesData);

 
    //create download links in downloadDiv of compress tab
    createDownloadButtons(compress.fileInput.filesData);

    //clear selected files
    compress.fileInput.filesData = [];
    compress.fileInput.fileInputElement.value = null;

    //enable compress btn
    e.target.textContent = "Compress";
    e.target.disabled = false;
});


function createDownloadButtons( files ){
    let count = 1;
    for( let file of files ){
        let id = "downloadBtnDiv" + count;

        let wrapperDiv = document.createElement("div");
        wrapperDiv.setAttribute("id", id);

        //create and append anchor to download file
        let anchor = document.createElement("a");
        anchor.setAttribute("href", URL.createObjectURL(file.blob)); 
        anchor.textContent = createDownloadFileName(file.name);
        anchor.setAttribute( "download", anchor.textContent );
        anchor.classList.add("btn");
        anchor.classList.add("btn-outline-success");
        wrapperDiv.append(anchor);

        //create and append button to remove download field
        let clearBtn = document.createElement("button");
        clearBtn.setAttribute("type", "button");
        clearBtn.classList.add("btn");
        clearBtn.classList.add("btn-danger");
        clearBtn.textContent = "X";
        clearBtn.addEventListener("click", (e) => {
            document.querySelector(`#${new String(id)}`).remove();
        });
        wrapperDiv.append(clearBtn);
        
        compress.downloadDiv.append(wrapperDiv);
        count++;
    }
}

function createDownloadFileName( name = "" ){
    let newName = "";

    //remove .txt extension
    for( let i = name.length; i >= 0; i-- ){
        if( name[i] === "." ){
            newName = name.slice(0, i) + "-compressed.bin";
            break;
        }
    }

    return newName;
}