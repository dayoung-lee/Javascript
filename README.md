# Javascript
This is Javascript examples for studying myself
## 1. Basic Concept of JavaScript
+ https://dayoung-lee.github.io/Javascript/1/index.html
  + data type, if/while/for loop, array, function, object
  + object.function => method ex) person.fullName();
  
## 2. Ajax
Ajax : Asyncronous JavaScript and XML<br/>
SPA : Single Page Application (Ajax, Pjax, Progressive Web Apps...)
+ https://dayoung-lee.github.io/Javascript/2/index.html
  + fetch API(chage contents/list(menu)): https://dayoung-lee.github.io/Javascript/2/fetch.html 
  + fetch API polyfill (to make fetch a viable replacement for most uses of XMLHttpRequest in traditional web applications)
  + hash(url, set up startup page): https://dayoung-lee.github.io/Javascript/2/hash.html
  + bookmark (#! hashbang) #!welcome, #!html, #!css, #!javascript  
 
  + Bad idea: SEO(search engine optimization) crawling issues, indexing issues, broken website navigation and useless addressbar (all pages load under the same URL), usless back/next/reload buttons/potential cloaking issues 

## 3. Facebook login 
Factbook API, Factboodk javascript SDK, Access token (https://developers.facebook.com/?ref=logo_click)<br/>
SDK: software development kit
1. load SDK (download): line 22 index.hmtl
2. SDK init (client id): line 8 index.html (appID & facebook api changelog log)
3. Login: FB.login();
4. Logout: FB.logout();
5. isLogined: function checkLoginStatus();
6. call facebook API user profile: graph API
+ https://dayoung-lee.github.io/liveDemo/p4/index.html
