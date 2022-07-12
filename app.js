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
            displayQuestions(data.GSI[i]);
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
