let path = require("path");
let fs = require("fs");

let types = {
    media : ["mp4","mkv"],
    archives : ["zip","7z","rar","tar","gz","ar","iso","xz"],
    app : ['exe','apk','dmg','pkg','deb'],
    documents : ['docx','doc','pdf','xls','xlsx','odt','ods','odp','odg','odf','txt', 'ps','tex'],
    image : ['png','svg','jpeg']
}

function organizeFn(dirpath){
    let directory;
    if(dirpath == undefined){
        treeHelper(process.cwd(),"");
    }else{ 
        let doesExist = fs.existsSync(dirpath)
        if(doesExist){
            directory = path.join(dirpath,"organized_files");
            if(fs.existsSync(directory) == false){
                fs.mkdirSync(directory);
            }
        }else{
            console.log("please enter correct path");
            return; 
        }
    }
    organize_helper(dirpath,directory);
}

function organize_helper(src,dest){
    let content = fs.readdirSync(src);
    for(let i = 0;i < content.length;i++){
        let childPath = path.join(src,content[i]);
        let isFile = fs.lstatSync(childPath).isFile();
        if(isFile){
            let category = getCategory(childPath);
            sendFile(childPath,dest,category);
            
        }
    }
}

function sendFile(srcFile,dest,category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let baseName = path.basename(srcFile);
    let destpath = path.join(dest,baseName);
    fs.copyFileSync(srcFile,destpath);
    fs.unlinkSync(srcFile);
}

function getCategory(childPath){
    let ext = path.extname(childPath);
    ext = ext.slice(1);
    for(let type in types){
        let cType = types[type];
        for(let i = 0;i < cType.length;i++){
            if(ext == cType[i]){
                return type;
            }
        }
        return "others";
    }
}


module.exports = {
    organizeKey : organizeFn

}