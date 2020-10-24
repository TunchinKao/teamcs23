var fs=require('fs');
var twoDarray=new Array();
/*fs.readFile('CS_require_course.txt',function(err, data){
    if(err) throw err;

    var sector=new Array();
    sector=data.toString();
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
});*/

module.exports = function(g){
    if(g == 2)return 'aaa';
    fs.readFile('CS_require_course.txt',function(err, data){
        if(err) throw err;
    
        var sector=new Array();
        sector=data.toString();
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
    return twoDarray;
};