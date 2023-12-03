let path = require("path");
let fs = require("fs");

function treeFn(dirpath){
    if(dirpath == undefined){
        treeHelper(process.cwd(),"");
    }else{
        let doesExist = fs.existsSync(dirpath)
        if(doesExist){
           treeHelper(dirpath,"");
        }else{
            console.log("please enter correct path");
            return; 
        }
    }
}

function treeHelper(dirpath,indent){
    let isFile = fs.lstatSync(dirpath).isFile();
    if(isFile){
        let fname = path.basename(dirpath);
        console.log(indent+"|----" + fname);
        return;
    }
    else{
        let dirname = path.basename(dirpath);
        console.log(indent+"`----" + dirname);
        let content = fs.readdirSync(dirpath);
        for(let i = 0;i < content.length;i++){
            let childPath = path.join(dirpath,content[i]);
            treeHelper(childPath,indent+"\t");
        }
    }
}

module.exports = {
    treeKey : treeFn
}