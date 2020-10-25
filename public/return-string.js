const { EOF } = require('dns');
var fs=require('fs');
var sector=new Array();
sector=data.toString();
var twoDarray=new Array();
var j=0;
module.exports = function(g){
fs.readFile('CS_require_course.txt',function(err, data){
    if(err) throw err;

    for(var i=0;i<54;i++){
        twoDarray[i]=new Array();
        for(j;sector[j]!='\n'&&sector[j]!='\r';j++){
            if(i==53&&j==sector.length)break;
            twoDarray[i].push(sector[j]);
        }
        j+=2;
        //console.log(twoDarray[i]);
    }

    var map=new Array(9);
    var maprow=0;
    for(var i=0;i<54;i++){
        if((twoDarray[i].join(''))=="大一上"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大一下"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大二上"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大二下"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大三上"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大三下"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||((twoDarray[j].join('')=="---")))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
        else if((twoDarray[i].join(''))=="大四上"){
            map[maprow]=new Array();
            for(var j=i+2;;j++){
                if((twoDarray[j].join('')=="------")||(twoDarray[j].join('')=="---"))break;
                map[maprow].push(twoDarray[j].join(''));
            }
            console.log(map[maprow]);
            maprow++;
        }
    }
    var space="";
    map[maprow]=new Array();
    map[maprow].push(space);
    console.log(map[maprow]);
});
    return map[g.grade];
}