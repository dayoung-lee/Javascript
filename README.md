# Javascript
This is Javascript examples for studying myself
## 1. Basic Concept of JavaScript
+ <b>https://dayoung-lee.github.io/Javascript/1-basic/index.html</b>
  + data type, if/while/for loop, array, function, object
  + object.function => method ex) person.fullName();
  
## 2. Ajax
Ajax : Asyncronous JavaScript and XML<br/>
SPA : Single Page Application (Ajax, Pjax, Progressive Web Apps...)
+ <b>https://dayoung-lee.github.io/Javascript/2-ajax/index.html</b>
  + fetch API(chage contents/list(menu)): https://dayoung-lee.github.io/Javascript/2/fetch.html 
  + fetch API polyfill (to make fetch a viable replacement for most uses of XMLHttpRequest in traditional web applications)
  + hash(url, set up startup page): https://dayoung-lee.github.io/Javascript/2/hash.html
  + bookmark (#! hashbang) #!welcome, #!html, #!css, #!javascript  
 
  + Bad idea: SEO(search engine optimization) crawling issues, indexing issues, broken website navigation and useless addressbar (all pages load under the same URL), usless back/next/reload buttons/potential cloaking issues 

## 3. Facebook login 
Factbook API, Factboodk javascript SDK, Access token (https://developers.facebook.com/?ref=logo_click)<br/>
SDK: software development kit
+ <b>https://dayoung-lee.github.io/liveDemo/p4/index.html</b>
1. load SDK (download): line 22 index.hmtl
2. SDK init (client id): line 8 index.html (appID & facebook api changelog log)
3. Login: FB.login();
4. Logout: FB.logout();
5. isLogined: function checkLoginStatus();
6. call facebook API user profile: graph API


## 4. Node.js
+ deploy app on heroku: <b>https://practice-nodejs.herokuapp.com/</b>
- connect server
  - http://opentutorials.org:3000/main?id=HTML&page=12
  - http: protocol, opentutorials.com: host(domail), :3000 (port), main: path, id=HTML&page=12: query string
- synchronous/asynchoronous
- npm(pm2): Advanced, production process manager for Node.js/pm2 start main.js
- get query string/change it to title
- get data/change it to content 
- Restful API - CRUD file (fs module)
  - C: create/request.on
  - R: read/ redirect response.writeHead(302, {Location: `/?id=${title}`});
  - U: update
  - D: delete
- Security
  - npm sanitize html
  - path.parse (update, delete, password etc.)
  - path.parse(queryData.id).base;
  
  ## 5. Node.js - Express
  + deploy app on heroku: <b>https://node-express-app1.herokuapp.com/</b>
