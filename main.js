
const compress = {
    fileInput : {
        files : null,
        fileInputElement : document.querySelector("#inputGroupFile04"),
        clearBtn : document.querySelector("#inputGroupFileAddon04"),
    },
    textareaInput : document.querySelector("#text-input"),
    compressBtn : document.querySelector("#compress-btn"),
    downloadDiv : document.querySelector("#compress-download"),
}


compress.fileInput.fileInputElement.addEventListener("change", (e) => {
    compress.fileInput.files = e.target.files;
});

compress.fileInput.clearBtn.addEventListener("click", (e) => {
    compress.fileInput.files = null;
    compress.fileInput.fileInputElement.value = null;
});

compress.compressBtn.addEventListener("click", (e) => {
    //check if input are available
    if( compress.fileInput.files === null && compress.textareaInput.value === "" )
        alert("No files and text were given to compress!!");

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

    for( let file of compress.fileInput.files ){
        let obj = { name : null, str : null, blob : null };
        obj.name = createDownloadFileName(file.name);   //with .bin extension

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