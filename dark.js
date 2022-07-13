let darkmode=0;
const themeicon = document.getElementById("theme-icon");

themeicon.addEventListener("click", changetheme);

const header=document.querySelector("#header");
const searchbox=document.querySelector("#search");
const footer=document.querySelector("footer");
const githublink=document.querySelector("#github-link");

if(Cookies.get("dark")){
    applydarkmode();
}
else{
    applylightmode();
};

function applydarkmode(){
    darkmode=1;
    Cookies.set('dark', true);
    themeicon.innerText="light_mode";
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#fff";
    header.style.backgroundColor="rgba(255, 255, 255, 0.12)";
    header.style.color="#fff";
    search.style.backgroundColor="rgba(255, 255, 255, 0.12)";
    searchBar.style.color="#fff";
    footer.style.backgroundColor="rgba(255, 255, 255, 0.12)";
    footer.style.color="#fff";
    githublink.style.color="#fff";

}
function applylightmode(){
    darkmode=0;
    Cookies.set('dark', false);
    themeicon.innerText="dark_mode";
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#333";
    header.style.backgroundColor="#fff";
    header.style.color="#333";
    search.style.backgroundColor="#fff";
    searchBar.style.color="#333";
    footer.style.backgroundColor="#fff";
    footer.style.color="#333";
    githublink.style.color="#333";

}


function changetheme(){
    // console.log("Clicked!");
    removeQuestions();
    if(darkmode){
        applylightmode();
    }
    else{
        applydarkmode();
        
    }
}
