var http = require('http');
var fs = require('fs');
var url = require('url');  // url module
var express = require('express');
var app = express();

function templateHTML(title, list, body){
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    <input type = "button" value = "view source" onclick = "location.href = 'https://github.com/dayoung-lee/Javascript/blob/master/nodejs/main.js'">
    ${list}
    ${body}
    </body>
    </html>    
    `;
}

function templateList(filelist){
    // var list = `<ol>
    // <li><a href="?id=HTML">HTML</a></li>
    // <li><a href="?id=CSS">CSS</a></li>
    // <li><a href="?id=JavaScript">JavaScript</a></li>
    // </ol>`;
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i++;                   
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // console.log(url.parse(_url, true));
    if(pathname === '/'){
        if(queryData.id === undefined){
            // home                              
            fs.readdir('data', function(err, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';               
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);

                response.writeHead(200);
                response.end(template); 
                }); // readdir
        } // if undefined
        else{
            // CSS, HTML, JavaScript
            fs.readdir('data', function(err, filelist){                
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;                    
                    var list = templateList(filelist); 
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);

                    response.writeHead(200);
                    response.end(template);                             
                });
            });
        }
    }else{
        response.writeHead(404);
        response.end("Page Not found."); 
    }    
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});
//app.listen(3000);
