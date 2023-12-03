#!/usr/bin/env nodejs

let tree = require("./commands/tree");
let help = require("./commands/help")
let organize = require("./commands/organize")


//input of commands
let input = process.argv.slice(2);

let cmd = input[0];
switch(cmd){
    case "tree":
        tree.treeKey(input[1]);
        break;
    case "organize":
        organize.organizeKey(input[1]);
        break;
    case "help":
        help.helpKey();
        break;
    default :
        console.log("Please input right command");
        break;
}








