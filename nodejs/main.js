var http = require('http');
var fs = require('fs');
var url = require('url');  // url module

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

                var template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                    </body>
                    </html>    
                    `;
                response.writeHead(200);
                response.end(template); 
                }); // readdir
        } // if undefined
        else{
            fs.readdir('data', function(err, filelist){
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                  }
                list = list + '</ul>'; 
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                    </body>
                    </html>    
                    `;
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
app.listen(3000);