// module
var http = require('http');
var fs = require('fs');
var url = require('url');  
var express = require('express');
var app = express();
var qs = require('querystring');
// lib/template.js
var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // console.log(url.parse(_url, true));
    // console.log(pathname);
    
    // home 
    if(pathname === '/'){
        if(queryData.id === undefined){                                         
            fs.readdir('data', function(err, filelist){
                var title = 'Welcome';
                var description = 'Hello, I am Dayoung Lee. This is my web application with Node.js.';               

                // var list = templateList(filelist);
                // var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,
                // `<a href = "/create">create</a>`);
                // response.writeHead(200);
                // response.end(template); 

                var list = template.List(filelist);
                var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
                `<a href = "/create">create</a>`);
                response.writeHead(200);
                response.end(html); 
                });
        } 
        // data/files...
        else{            
            fs.readdir('data', function(err, filelist){                
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;                    
                    var list = template.List(filelist); 
                    var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
                    `<a href = "/create">create</a> 
                    <a href = "/update?id=${title}">update</a>
                    <form action = "/delete_process" method = "post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                    </form>`);
                    response.writeHead(200);
                    response.end(html);                             
                });
            });
        }
    }else if(pathname === '/create'){                         
      fs.readdir('data', function(err, filelist){
        var title = 'WEB - create';
        var list = template.List(filelist);
        var html = template.HTML(title, list, `
            <form action="/create_process" method="post"> <!-- 입력된 값을 여기로 전송하고싶다.  get dafualt (query). post (hide query) -->
            <p><input type="text" name = "title" placeholder = "title"></p>        
            <p><textarea name = "description" placeholder = "description"></textarea></p>    
            <input type="submit"></form>`, ''
        );
        response.writeHead(200);
        response.end(html); 
        }); 
    }else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){            
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end(''); 
            })
            
        });       
    }else if(pathname === '/update'){
        fs.readdir('data', function(err, filelist){                
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var title = queryData.id;                    
                var list = template.List(filelist); 
                var html = template.HTML(title, list, `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value ="${title}">
                    <p><input type="text" name = "title" placeholder = "title" value="${title}"></p>        
                    <p><textarea name = "description" placeholder = "description">${description}</textarea></p>    
                    <input type="submit"></form>
                    `,
                    `<a href = "/create">create</a> <a href = "/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);                             
            });
        });
    }else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){            
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(){                    
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end(''); 
                });
            });
            //console.log(post);
        });       
    }else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){            
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;                        
            //console.log(post);
            fs.unlink(`data/${id}`, function(err){
                if (err) throw err;
                //if delete success -> go home
                response.writeHead(302, {Location: `/`});
                response.end(''); 
            });
        });       
    }
    else{
        response.writeHead(404);
        response.end("Page Not found."); 
    }    
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Connected!');
});
//app.listen(3000);
