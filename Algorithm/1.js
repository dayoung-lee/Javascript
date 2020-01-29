function solution(a, b) {
    var date = new Date(2016, (a-1), b);
    var day = date.getDay();
    var dayArray = ['SUN','MON','TUE', 'WED','THU','FRI','SAT']
    var answer = dayArray[day];
    return answer;
}


console.log(solution(5,24));

// result: TUE
