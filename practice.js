let data = " select * from students"

const first = data.split(' ')[2]

let query = " select name,roll from student"
 
const q1 = query.split(',')[3]

var val="160,159,158,157,156,155,143,141,140,139";
console.log("Count : ",query.split(",").length);

let hritik = {
    name:"Hriitk",
    roll:2001089,
    cpi:9.14
}

for(let colum of Object.keys(hritik)){
    console.log(colum)
}

for(key in hritik){
    console.log(hritik[key])
}