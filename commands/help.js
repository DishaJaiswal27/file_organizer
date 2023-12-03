function helpFn(){
    console.log(`
        List of commands:
            node main.js tree "directory_path"
            node main.js organize "directory_path"
            node main.js help
   
    `);
}
module.exports = {
    helpKey : helpFn
}