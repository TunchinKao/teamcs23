const { EOF } = require('dns');
var fs=require('fs');
var twoDarray=new Array();

const require_index = 2;
const optimal_index = 3;
var fileName;
var limit; // 不知道怎麼測.txt長度的下下策
module.exports = function(g){
    if(g.grade == 1)
        return 'aaa';
    else if(g.grade == 2){
        fileName = 'CS_require_course.txt';
        limit = 53;
    }
    else if(g.grade == 3){
        fileName = 'CS_optimal_course.txt';
        limit = 31;
    }

    fs.readFile(fileName.toString(),function(err, data){
        if(err) throw err;
    
        var sector=new Array();
        sector=data.toString();
        var j=0;
        for(var i=0;i<limit;i++){
            // twoDarray[i]=new Array();
            // j++;
            twoDarray[i] = "";
            for(j;sector[j]!='\n';j++){
                twoDarray[i] += (sector[j]);
            }
            j++;
            console.log(twoDarray[i]);
        }
        // console.log(twoDarray[52].join(''));
    });
    return twoDarray;
};
/*fs.readFile('CS_require_course.txt',function(err, data){
    if(err) throw err;

    var sector=new Array();
    sector=data.toString();
    var j=0;
    for(var i=0;i<54;i++){
        twoDarray[i]=new Array();
        for(j;sector[j]!='\n'&&sector[j]!='\r';j++){
            if(i==53&&j==sector.length)break;
            twoDarray[i].push(sector[j]);
        }
        j+=2;
        console.log(twoDarray[i]);
    }
    console.log(twoDarray[52].join(''));
});*/

// module.exports = function(g){
//     if(g.grade == 2)return 'aaa';
//     fs.readFile('CS_require_course.txt',function(err, data){
//         if(err) throw err;
    
//         var sector=new Array();
//         sector=data.toString();
//         var j=0;
//         for(var i=0;i<53;i++){
//             twoDarray[i]=new Array();
//             for(j;sector[j]!='\n';j++){
//                 twoDarray[i].push(sector[j]);
//             }
//             j++;
//             console.log(twoDarray[i]);
//         }
//         console.log(twoDarray[52].join(''));
//     });
//     return twoDarray;
// };
