var fs = require('fs'); // file system module
// file read

fs.readFile('sample.txt', 'utf8', function(err, data){
    console.log(data);
});
