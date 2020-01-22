var fs = require('fs');
var testFolder = "../data";

fs.readdir(testFolder, function(err, filelist){
    console.log(filelist);
})