// ====start Global
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var alertName = document.getElementById('alertName');
var alertUrl = document.getElementById('alertUrl');
var alertExist = document.getElementById('alertExist');
var btnAdd = document.getElementById('btnAdd');
var boooksContainer = []


// ====when start 
if (getLocal() !==null){
    boooksContainer =getLocal();
    displayData();
}



// ====start Events

btnAdd.onclick =function(){
    addBook()
}
// ====start function
function addBook() {
    if((nameValigation() === true) & (urlValigation() === true)){
        var book ={
            name:siteName.value,
            url:siteUrl.value
        }
        boooksContainer.push(book)
        
        displayData();
        setLocal();
        resetForm()
    }
    
}

function displayData(){

    var tableData=``  

    for (var i = 0; i< boooksContainer.length; i++){
        tableData+=`
        <div class="d-flex bg-gray my-3">
                <h2 class="pe-3 w-25">${boooksContainer[i].name}</h2>
                <a class="btn btn-primary me-3" href="${boooksContainer[i].url}" target="_blank">visit</a>
                <button class="btn btn-danger btndelete" onclick="deleteRow(${i})">Delete</button>
            </div>


        `
    }
    var bookmarkList=document.getElementById('bookmarkList').innerHTML =tableData
}
function resetForm(){
    siteName.value = ''
    siteUrl.value = ''
}
function setLocal() {
    localStorage.setItem("boooksContainer", JSON.stringify(boooksContainer));
}
function getLocal() {
  return JSON.parse (localStorage.getItem("boooksContainer"));
}
function deleteRow(index){
    boooksContainer.splice(index,1);
    setLocal();
    displayData();
    console.log(boooksContainer);
}
// ====start valigation
function nameValigation(){
    if(siteName.value ===''){
        alertName.classList.remove('d-none');
        return false;
    }
    else{
        var isExist =false;
        for(var i=0 ; i<boooksContainer.length ; i++){
            if(boooksContainer[i].name === siteName.value){
                isExist=true;
                break;
            }
        }

        if(isExist=== true){
            alertExist.classList.remove('d-none');
            return false;
        }
        else{
            alertExist.classList.add('d-none');
            
        }

        
        alertName.classList.add('d-none')
        return true;
        
    }
}

function urlValigation(){
    if(siteUrl.value ===''){
        alertUrl.classList.remove('d-none');
        return false;
    }
    else{
        alertUrl.classList.add('d-none')
        return true;
    }
}



