function startsearch(){
    fetch("./UPSC Star Data.json")
    .then(response => {
    return response.json();
    })
    .then(data => searchQuestion(data));

}
const searchBar = document.getElementById("search-bar");

const searchbtn = document.getElementById("search-btn");
searchbtn.addEventListener('click', startsearch);

let yearfilter = [
    {
        "year": 2021,
        "state": 0
    },
    {
        "year": 2020,
        "state": 0
    },
    {
        "year": 2019,
        "state": 0
    },
    {
        "year": 2018,
        "state": 0
    },
    {
        "year": 2017,
        "state": 0
    },
    {
        "year": 2016,
        "state": 0
    },
    {
        "year": 2015,
        "state": 0
    },
    {
        "year": 2014,
        "state": 0
    },
    {
        "year": 2013,
        "state": 0
    }

];

// let filterswitch=0;

function checkfilterswitch(){
    let n =0;
    yearfilter.forEach(y=>{
        if(y.state){n=1;}
    });
    if(n){return 1;}else{return 0;}

}

//0: All 1:GS-I 2:GS-II 3:GS-III 4:GS-IV
let papercode = 1;

function searchQuestion(data){
    removeQuestions();
    query = getQuery().toLowerCase();
    switch(papercode){
        case 1:
            dataSize = data.GSI.length;
            filterdata = data.GSI;
            break;
        case 2:
            dataSize = data.GSII.length;
            filterdata = data.GSII;
            break;
        case 3:
            dataSize = data.GSIII.length;
            filterdata = data.GSIII;
            break;
        case 4:
            dataSize = data.GSIV.length;
            filterdata = data.GSIV;
            break;
        default:
            dataSize = data.GSI.length;
            filterdata = data.GSI;
            break;
    }
    // console.log(dataSize);
    for (let i = 0; i < dataSize; i++) {
        ques=(filterdata[i].Question).toLowerCase();
        n=ques.search(query);
        if(n>=0){
            // console.log(data.GSI[i].Question);
            if(checkfilterswitch()){
                yearfilter.forEach(y=>{
                    if(y.state){
                        if(y.year==filterdata[i].Year){
                            displayQuestions(filterdata[i]);
                        }
                        
                    }
                    
                })

            }
            else{
                displayQuestions(filterdata[i]);
            }    
        }
        
    }
}
function getQuery(){
    return searchBar.value;
    // console.log(searchBar.value);
}


// Execute a function when the user presses a key on the keyboard
searchBar.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchbtn.click();
  }
});

document.addEventListener("keydown", function(event){
    if(event.key==="Escape"){
        event.preventDefault();
        removeQuestions();
        // alert("Clicked!");

    }

});

const filterbtn = document.getElementById("filter-btn");
const filterbox = document.getElementsByClassName("filter-box");
filterbtn.addEventListener('click', function(){
    filterbox[0].classList.toggle("filter-box-open");

});

const filtertags = document.querySelectorAll(".filter-tags");
const papertags = document.querySelectorAll(".paper-tags");
papertags[0].classList.add("paper-tags-clicked");


filtertags.forEach(element => {
    element.addEventListener('click', function(){
        element.classList.toggle("filter-tags-clicked");
        yearfilter.forEach(y=>{
            if(element.innerText==y.year){
                if(y.state){
                    y.state=0;
                }
                else{
                    y.state=1;
                }
            }
    
        });       
    });
    
});

paperfilters=[
    {
        paper: "GS-I",
        state: 1
    },
    {
        paper: "GS-II",
        state: 0
    },
    {
        paper: "GS-III",
        state: 0
    },
    {
        paper: "GS-IV",
        state: 0
    },
];

papertags.forEach(element=>{
    element.addEventListener('click', function(){
        papertags.forEach(item=>{
            if(element.innerText==item.innerText){item.classList.add("paper-tags-clicked");}
            else{item.classList.remove("paper-tags-clicked")}

        });
        paperfilters.forEach(item=>{
            if(item.paper==element.innerText){
                item.state=1;
                switch(item.paper){
                    case "GS-I":
                        papercode=1;
                        break;
                    case "GS-II":
                        papercode=2;
                        break;
                    case "GS-III":
                        papercode=3;
                        break;
                    case "GS-IV":
                        papercode=4;
                        break;
                    default:
                }
            }
            else{item.state=0;}

        });

    });

});


const questionsList = document.getElementById("questions-list");

function displayQuestions(item){
    const questionBox = document.createElement('div');
	questionBox.classList.add("question-box");
    questionBox.innerHTML = `<div><p class="questions">${item.Question}</p></div>
    <div class="qinfo">
        <div class="qinfo-items">Paper: ${item.Paper}</div>
        <div class="qinfo-items">Year: ${item.Year}</div>
        <div class="qinfo-items">Marks: ${item.Marks}</div>
        <div class="qinfo-items">Word Limit: ${item.WordLimit}</div>
    </div>`;

    questionsList.appendChild(questionBox);    
}
function removeQuestions(){
    t=questionsList.childElementCount;
    for(var i=0;i<t;i++){
        questionsList.removeChild(questionsList.children[0]);
    }
}
