var express = require('express');
var app = express();
var fs = require('fs');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
var path = require('path');
var qs = require('querystring');


// route, routing
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response){
    fs.readdir('data', function(err, filelist){
        var title = 'Welcome';
        var description = 'Hello, I am Dayoung Lee. This is my web application with Node.js.';                               
        var list = template.List(filelist);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
            `| <a href = "/create">create</a> |`);        
        response.send(html); 
    });
});
app.get('/page/:pageId', function(request, response){
    fs.readdir('./data', function(err, filelist){
    var filteredId = path.parse(request.params.pageId).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){                
            var title = request.params.pageId;           
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description);         
            var list = template.List(filelist); 
            var html = template.HTML(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<form action = "/delete_process" method = "post">
                | <a href = "/create">create</a> |
                <a href = "/update/${sanitizedTitle}">update</a> |
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete" onclick = "return confirm('Are you sure you want to delete this?');">
            </form>`);
            response.send(html);                             
        });
    });
});

app.get('/create', function(request, response){
    fs.readdir('./data', function(err, filelist){
        var title = 'WEB - create';
        var list = template.List(filelist);
        var html = template.HTML(title, list, `
            <form action="/create_process" method="post"> <!-- 입력된 값을 여기로 전송하고싶다.  get dafualt (query). post (hide query) -->
                <p><input type="text" name = "title" placeholder = "title"></p>        
                <p><textarea name = "description" placeholder = "description"></textarea></p>    
                <input type="submit"></form>`, ''
            );
        response.send(html); 
    }); 
});

//create_process method: post
app.post('/create_process', function(request, response){
    var body = '';
        request.on('data', function(data){            
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/page/${title}`});
                response.end(''); 
        })
    });       
});

app.get('/update/:pageId', function(request, response){
    var filteredId = path.parse(request.params.pageId).base;        
    fs.readdir('data', function(err, filelist){                
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var title = request.params.pageId;                    
            var list = template.List(filelist); 
            var html = template.HTML(title, list, `
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value ="${title}">
                <p><input type="text" name = "title" placeholder = "title" value="${title}"></p>
                <p><textarea name = "description" placeholder = "description">${description}</textarea></p>    
                <input type="submit"></form>
                `,
                `| <a href = "/create"> create</a> | <a href = "/update/${title}">update</a> |`
            );
            response.send(html);                             
        });
    });
});

app.post('/update_process', function(request, response){   
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
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    // response.writeHead(302, {Location: `/page/${title}`});
                    // response.end(''); 
                    response.redirect(`/page/${title}`);
            });            
        })
    });       
});

app.post('/delete_process', function(request,response){
    var body = '';
    request.on('data', function(data){            
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;                        
        var filteredId = path.parse(id).base;        
        fs.unlink(`data/${filteredId}`, function(err){
            if (err) throw err;
            //if delete success -> go home
            // response.writeHead(302, {Location: `/`});
            // response.end(''); 
            response.redirect('/');
        });
    });       
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Example app listening on port 3000!');
});
