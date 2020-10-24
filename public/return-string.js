var fs=require('fs');
fs.readFile('CS_require_course.txt',function(err, data){
    if(err) throw err;

    var sector=new Array();
    sector=data.toString();
    var twoDarray=new Array();
    var j=0;
    for(var i=0;i<53;i++){
        twoDarray[i]=new Array();
        for(j;sector[j]!='\n';j++){
            twoDarray[i].push(sector[j]);
        }
        j++;
        console.log(twoDarray[i]);
    }
    console.log(twoDarray[52].join(''));
});