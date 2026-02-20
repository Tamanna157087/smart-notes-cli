const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function viewnotes(){
    try{
    const data = fs.readFileSync("notes.txt","utf-8");
   if(data.trim() === ""){ //trim se spaces remove hoti hai
    console.log("\nNo notes found.");
      mainMenu();
      return;
    }
    const notesArray = data.split("\n"); //split krne se array m convert hota h.
   console.log("\nYour notes: ");
   for(let i = 0; i<notesArray.length; i++){
    if(notesArray[i] !== ""){
        console.log((i+1) + ". " + notesArray[i])
    }
   }
}
catch (error) {
    console.log("No notes file found. Please add a note first.");
  }

    mainMenu();
   }
  
 
function showmenu(){
    console.log("1. Add note");
    console.log("2. view notes");
    console.log("3. exit");
    console.log("4. Delete all notes");
    console.log("5. Delete one note");
    console.log("6. Edit a note");
    console.log("7. Search note");

}
showmenu();
function addnote() {
     rl.question("write your note: ",function(text){

        if (text.trim() === "") {
      console.log("Note cannot be empty!");
      return mainMenu();
    }
    fs.appendFileSync("notes.txt", text +"\n");
 console.log("Note saved successfully!");
    showmenu();
    mainMenu();
});
}
function deleteNotes(){
    fs.writeFileSync("notes.txt", "");
    console.log("all notes are deleted");
    mainMenu();
}

function deleteOneNotes(){
    try{
        const data = fs.readFileSync("notes.txt","utf-8");

        if(data.trim() == ""){
            console.log("No notes to delete");
        
        return mainMenu();
        }
        const notesArray = data.split("\n").filter(note => note !== ""); //Sometimes file has empty lines.This removes empty strings ""


        console.log("/nYour notes: ");
        for(let i = 0; i<notesArray.length; i++){
            console.log((i+1) + ". " + notesArray[i]);
        }
        rl.question("Enter note number to delete: ",function(num) {
            const index = Number(num) - 1;  //0 based indexing
        
        if (index < 0 || index >= notesArray.length) {
        console.log("Invalid note number.");
        return mainMenu();
      }
      notesArray.splice(index,1); //array.splice(startIndex, howManyToRemove)


      fs.writeFileSync("notes.txt",notesArray.join("\n") + "\n"); //Converts array back into text and /n Adds new line between notes.
      //eg. arr.join(",") apple,banana,mango
      //Last "\n" = “prepare space for next note means it will not remail on last word but will go to next line for next work”

      console.log("Note deleted successfully!");
      mainMenu();
       });
    }
catch (error){
     console.log("No notes file found.");
    mainMenu();
  }
}

function editNote(){
    try{
    const data = fs.readFileSync("notes.txt","utf-8")
       if(data.trim() === ""){
            console.log("No notes to edit.");
            return mainmenu();
        }
    const notesArray = data.split("\n").filter(note=>note!== "");
    for(let i = 0; i<notesArray.length; i++){
        console.log((i+1) + ". " + notesArray[i]);
    }
    rl.question("Enter note to edit: ",function(num){
    const index = Number(num)-1;
    if(index<0 || index>=notesArray.length){
        console.log("Invalid Number");
            return mainMenu();
    }
    rl.question("Enter new note: ", function(newtext){
        if(newtext.trim() === ""){
                    console.log("Note cannot be empty.");
                    return mainMenu();
                }
        notesArray[index]=newtext;

    fs.writeFileSync("notes.txt", notesArray.join("\n") + "\n");
    mainMenu();
});
    });
 } catch(error){
        console.log("No notes file found.");
        mainmenu();
    }
}
function searchnote(){
    const data=fs.readFileSync("notes.txt","utf-8");
    if(data.trim()===""){
        console.log("No notes available");
        return mainMenu();
    }
    const notesarray=data.split("\n").filter(note=>note!=="");
    rl.question("Enter keyword to search",function(keyword){
        let found=false;
        for(let i=0;i<notesarray.length;i++){
            if(notesarray[i].includes(keyword)){
                console.log((i+1)+"."+notesarray[i]);
                found=true;
            }
           
        }
         if(!found){
    console.log("No matching notes found.");
}
    })
   return mainMenu();
}
function mainMenu(){
rl.question("enter your choice:", function(choice){
if(choice=="1"){
 addnote();
}
else if(choice=="2"){
 viewnotes();
}
 else if (choice == "3") {
            console.log("Exit");
            rl.close();
 }
 else if(choice == "4"){
    deleteNotes();
 }
 else if (choice == "5") {
 deleteOneNotes();
}
else if (choice == "6") {
 editNote();
}
else if(choice=="7"){
    searchnote();
}
else {
            console.log("Invalid choice");
            mainMenu();
}});
}
mainMenu();