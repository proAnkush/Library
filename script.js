var myLibrary = [];
class Book{
    constructor(title, author, npages, isRead){
        this.title = title
        this.author = author;
        this.npages = npages;
        this.isRead = isRead;
    }
}

myLibrary.push(new Book("Racing In Rain", "Tom Baker", 248, true));
myLibrary.push(new Book("Why Pandas Are Cute", "Quinn Harris", 321, false));
myLibrary.push(new Book("You Can", "Nathan Dontes", 367, true))

updateGridFromLibrary();

function updateGrid(mb){
    // update and display book cards grid
    // main card

    let myDiv = document.createElement("div");
    myDiv.classList.add("card");

 //   myDiv.setAttribute('id', mb.title);
    let myTitle = document.createElement("h2");
    myTitle.textContent = mb.title;
    if(mb.title.length > 25){
        myTitle.classList.add("marq");
        let myMarquee = document.createElement("marquee");
        myMarquee.appendChild(myTitle);
        myTitle = myMarquee;
    }
    let myHR = document.createElement("hr");
    let myP1 = document.createElement("p");
    myP1.textContent = mb.author;
    let myP2 = document.createElement("p");
    myP2.textContent = mb.npages + " pages";
    let myP3 = document.createElement("p");

    let myReadButton = document.createElement("button");
    myReadButton.setAttribute("data", ""+ myLibrary.indexOf(mb));
    // data will be true if book is read else false;
    myReadButton.onclick = myReadFunction;
    myReadButton.classList.add("readBtn");
    if(mb.isRead == true){
        myReadButton.textContent = "Marks as Unread";
        myDiv.classList.add("readed");
    }else{
        myReadButton.textContent = "Mark as Read";
        myDiv.classList.add("nonReaded")
    }


    let myDelBtn = document.createElement("button");
    myDelBtn.textContent = "Remove Book";
    myDelBtn.setAttribute("data", "" + myLibrary.indexOf(mb));
    myDelBtn.onclick = function removeCard(e){
            myLibrary.splice(e.path[0].getAttribute("data"), 1);
            updateGridFromLibrary();
    }
    myDelBtn.classList.add("remove");

    if(mb.isRead == true){
        myP3.textContent = "You have read this";
    }else{
        myP3.textContent = "You haven't read this";
    }
    // This doesn't exist
    // or does it
    myDiv.appendChild(myTitle); 
    myDiv.appendChild(myHR);
    myDiv.appendChild(myP1);
    myDiv.appendChild(myP2);
    myDiv.appendChild(myP3);
    myDiv.appendChild(myReadButton);
    myDiv.appendChild(myDelBtn);
    document.getElementById("book_cards").appendChild(myDiv);
}
function myReadFunction(e){
    myLibrary[e.path[0].getAttribute("data")].isRead = !myLibrary[e.path[0].getAttribute("data")].isRead;
    updateGridFromLibrary();
}

document.getElementById("add_button").onclick = addBookToLibrary;
function addBookToLibrary(){
    showForm();
}
function showForm(){
    document.getElementById("form").style = "visibility: visible";


    document.getElementById("submit").onclick = function(){
        var bookName = document.getElementById("inTitle").value;
        var bookAuth = document.getElementById("inAuth").value;
        var bookPage = document.getElementById("inPages").value;
        var bookRead = document.getElementById("inRead").checked;
        if(bookName == "" || bookName==" ") bookName = "Title"
        if(bookAuth == "" || bookName==" ") bookAuth = "Unknown"
        if(bookPage == "" || bookPage < 0) bookPage = "0";
        bookName = capitalize(bookName);
        bookPage = bookPage % 100000;
        myBook1 = new Book(bookName, bookAuth, bookPage, bookRead);
        myLibrary.push(myBook1);
        updateGrid(myBook1);
        formReset();
        document.getElementById("form").style = "visibility: hidden";
    }
    document.getElementById("cancel").onclick = function(){
        formReset();
        document.getElementById("form").style = "visibility: hidden";
    }
}
console.log("Hello, Dev!");
function formReset(){
    document.getElementById("inTitle").value = "";
    document.getElementById("inAuth").value = "";
    document.getElementById("inPages").value = "";
    document.getElementById("inRead").checked = false;
}
function updateGridFromLibrary(){
    clearGrid();
    myLibrary.forEach(updateGrid);
}
function clearGrid(){
    document.getElementById("book_cards").innerHTML = "";
}
function capitalize(input) {  
    var words = input.split(' ');  
    var CapitalizedWords = [];  
    words.forEach(element => {
        if(element[0])
            CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
}  


