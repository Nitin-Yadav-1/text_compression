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
    //check if input are available
    if( compress.fileInput.files === null && compress.textareaInput.value === "" ){
        alert("No files and text were given to compress!!");
        return;
    }

    //if input is available then compress it
    const inputObjects = [];

    if( compress.textareaInput.value !== "" ){
        let obj = {
            name : "compressed.txt",
            str : compress.textareaInput.value,
            blob : null,
        };
        inputObjects.push(obj);
    }

    //create download links in downloadDiv of compress tab
});


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