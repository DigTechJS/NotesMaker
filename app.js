console.log("Welcome to app.js")
showNotes();

// If user add a note then add it to the local storage
let addbtn= document.getElementById("addbtn");
addbtn.addEventListener("click",(e)=>{
    let addtxt=document.getElementById('addtxt');
    let notes= localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    // console.log(notesObj);
    showNotes();
});

// Function to show elements 
function showNotes(){
    let notes= localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
        html+=`
         
        <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note${index+1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete Note</button>
            </div>
          </div>
    


                      `
        let notesElement= document.getElementById("notes");
        if (notesObj.length!=0) {
            notesElement.innerHTML=html;
        }
        
    })
    let notesElement= document.getElementById("notes");
    if (notesObj.length==0){
        notesElement.innerHTML=`<div class="noteCard my-2 mx-2 card " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note</h5>
          <p class="card-text">Nothing to show</p>
          
        </div>
      </div>`
    }
}

// Function to delete a notes
function deleteNote(index){
    let notes= localStorage.getItem('notes');
    if (notes==null) {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    // console.log("Search event fired!!",inputVal);sona
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt= element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            
            element.style.display="block";
        }
        else{
            element.style.display="none";

        }
    })
})
