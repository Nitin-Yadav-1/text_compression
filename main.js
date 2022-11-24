
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


compress.fileInput.fileInputElement.addEventListener("change", (e) => {
    
    for( let file of e.target.files ){
        const reader = new FileReader();
        reader.onload = function(){
            let readResult = {
                name : file.name,
                str : reader.result,
                blob : null,
            }
            compress.fileInput.filesData.push( readResult );
        }
        reader.readAsText(file);
    }
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
            name : "compressed.bin",
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