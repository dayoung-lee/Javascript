module.exports = {
    HTML:function (title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <input type = "button" value = "view source" onclick = "location.href = 'https://github.com/dayoung-lee/Javascript/blob/master/nodejs/main.js'">
        ${list}
        ${control}
        ${body}
        </body>
        </html>    
        `;
    },
    List:function (filelist){
        // var list = `<ol>
        // <li><a href="?id=HTML">HTML</a></li>
        // <li><a href="?id=CSS">CSS</a></li>
        // <li><a href="?id=JavaScript">JavaScript</a></li>
        // </ol>`;
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href ="/page/${filelist[i]}">${filelist[i]}</a></li>`;
            i++;                   
        }
        list = list + '</ul>';
        return list;
    }
    
}