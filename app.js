function startsearch(){
    fetch("./UPSC Star Data - GSI.json")
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


function searchQuestion(data){
    removeQuestions();
    query = getQuery().toLowerCase();
    dataSize = data.GSI.length;
    // console.log(dataSize);
    for (let i = 0; i < dataSize; i++) {
        ques=(data.GSI[i].Question).toLowerCase();
        n=ques.search(query);
        if(n>=0){
            // console.log(data.GSI[i].Question);
            if(checkfilterswitch()){
                yearfilter.forEach(y=>{
                    if(y.state){
                        if(y.year==data.GSI[i].Year){
                            displayQuestions(data.GSI[i]);
                        }
                        
                    }
                    
                })

            }
            else{
                displayQuestions(data.GSI[i]);
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
