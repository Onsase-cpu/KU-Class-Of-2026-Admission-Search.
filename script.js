let students = [];

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

const studentCard =
document.getElementById("studentCard");

const notFound =
document.getElementById("notFound");

const results =
document.getElementById("multipleResults");



loadCSV();



function loadCSV(){

Papa.parse(
"students.csv",

{

download:true,

header:true,

skipEmptyLines:true,

complete:function(res){

students =
res.data;

console.log(
"CSV Loaded:",
students.length
);

},

error:function(){

alert(
"Unable to load students.csv"
);

}

}

);

}





searchBtn.addEventListener(
"click",

performSearch

);



searchInput.addEventListener(
"keypress",

function(e){

if(
e.key==="Enter"
){

performSearch();

}

}

);





function performSearch(){

let value =
searchInput.value
.trim()
.toLowerCase();

if(
!value
){

return;

}



studentCard.style.display=
"none";

notFound.style.display=
"none";

results.innerHTML=
"";



const mode =
document.querySelector(
'input[name="searchType"]:checked'
).value;



let found=[];



if(
mode==="admission"
){

found=
students.filter(

s=>

(
s["Admission Number"]||""
)

.toLowerCase()

===

value

);

}



if(
mode==="name"
){

found=
students.filter(

s=>

(
s["Student Name"]||""
)

.toLowerCase()

.includes(

value

)

);

}



if(
found.length===0
){

notFound.style.display=
"block";

return;

}



if(
found.length===1
){

showStudent(
found[0]
);

return;

}



showMultiple(
found

);

}





function showMultiple(list){

results.innerHTML=
"";



list.forEach(

student=>{

let card=
document.createElement(
"div"
);

card.className=
"result-item";



card.innerHTML=`

<h3>

${student["Student Name"]}

</h3>

<br>

<div>

${student["Admission Number"]}

</div>

<br>

<div>

${student["Programme"]}

</div>

`;



card.onclick=
function(){

showStudent(
student
);

};



results.appendChild(
card
);

}

);

}





function showStudent(student){

results.innerHTML=
"";



studentCard.style.display=
"block";



document.getElementById(
"serial"
).textContent=

student["S.No"]||"-";



document.getElementById(
"studentName"
).textContent=

student["Student Name"]||"-";



document.getElementById(
"gender"
).textContent=

student["Gender"]||"-";



document.getElementById(
"admission"
).textContent=

student["Admission Number"]||"-";



document.getElementById(
"programme"
).textContent=

student["Programme"]||"-";



document.getElementById(
"school"
).textContent=

student["School"]||"-";



document.getElementById(
"campus"
).textContent=

student["Campus"]||"-";



document.getElementById(
"cluster"
).textContent=

student["Cluster Points"]||"-";



document.getElementById(
"intake"
).textContent=

student["Intake"]||"-";



studentCard.scrollIntoView({

behavior:
"smooth"

});

}
