var Body = {
    setColor:function (color){
        // document.querySelector('body').style.color = color;
        // jQuery
        $('body').css('color', color);
    },
    setBackgroundColor:function (color){
        // document.querySelector('body').style.backgroundColor = color;
        // jQuery
        $('body').css('backgroundColor', color);
    }
}
var Links = {
    setColor:function (color){
        // var alist = document.querySelectorAll('a');
        // var i = 0;
        // while(i < alist.length){
        //     console.log(alist[i]);
        //     alist[i].style.color = color;
        //     i++;
        // }
        //
        // jQuery
        $('a').css('color', color);
    }
}
function nightDayHandler(self){
    var target = document.querySelector('body');
    if(self.value === 'night')
    {
        Body.setBackgroundColor('black');
        Body.setColor('white');
        self.value = 'day';
        Links.setColor('powderblue');
    }
    else {
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';
        Links.setColor('blue');
    }
}
function countingWords(){
    document.getElementById("textCountResult").innerHTML = document.getElementById("textArea").value.length;
}    