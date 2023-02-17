let tbTask = document.querySelector('[type="text"]')
let date = document.getElementById('d')
let table = document.querySelector('table tbody');
let submit = document.querySelector('[type="submit"]')

//blue from textTask input
let tbtext =  document.getElementById('task');
tbtext.onblur = ()=>{
    date.focus();
}

//Set The ID Of Task variable
if(localStorage.getItem('taskId')==null){
    localStorage.setItem('taskId' , 1);
}

window.onload = ()=>{
    
    //focus on textTask input 
    tbtext.focus();
    
    //load the data
    if(localStorage.length >1){
        for (let index = 0; index < localStorage.length; index++) {
            if( localStorage.key(index)!='taskId'){
            let data =  localStorage.getItem(localStorage.key(index)).split(',')
    
    
            let newTask   = document.createElement('tr');
            newTask.setAttribute('id' ,data[0])
            
            //Task Coulmn
            let columnTask = document.createElement('td');
            columnTask.appendChild(document.createTextNode(data[1]))
    
             //Time Coulmn
            let columnTime = document.createElement('td');
            columnTime.appendChild(document.createTextNode(data[2]))
    
             //Delete Coulmn
            let columnDelete = document.createElement('td');
            let buttomDelete = document.createElement('button');
            buttomDelete.appendChild(document.createTextNode('Delete'));
            buttomDelete.classList.add('btn');
            columnDelete.appendChild(buttomDelete);
            
            newTask.appendChild(columnTask); 
            newTask.appendChild(columnTime);
            newTask.appendChild(columnDelete);
            table.appendChild(newTask);  
    
            }
        }   
    }
      
}

submit.onclick =  ()=>{  
    if( tbTask.value != "" && date.value!=""){     
        let taskText = tbTask.value
        let dateTime = date.value
        
        let newTask   = document.createElement('tr');
        newTask.setAttribute('id' ,localStorage.getItem('taskId') )
        
        //Task Coulmn
        let columnTask = document.createElement('td');
        columnTask.appendChild(document.createTextNode(taskText))

         //Time Coulmn
        let columnTime = document.createElement('td');
        columnTime.appendChild(document.createTextNode(dateTime))

         //Delete Coulmn
        let columnDelete = document.createElement('td');
        let buttomDelete = document.createElement('button');
        buttomDelete.appendChild(document.createTextNode('Delete'));
        buttomDelete.classList.add('btn');
        //buttomDelete.id=`btn${newTask.id}`
        columnDelete.appendChild(buttomDelete);
        
        newTask.appendChild(columnTask); 
        newTask.appendChild(columnTime);
        newTask.appendChild(columnDelete);
        table.appendChild(newTask);  

        //Storage
        let arr = [newTask.id , taskText , dateTime]    
        localStorage.setItem(`task${newTask.id}` ,arr);      
        localStorage.setItem('taskId',Number(localStorage.getItem('taskId'))+1 );


        tbTask.value = "";
        date.value = "";
    }
}

//for Delete tasks
document.addEventListener('click' ,(e)=>{
     if(e.target.classList.contains('btn')){       
        let row = (e.target.parentElement).parentElement;
        let tbody = row.parentElement;       
        for (let index = 0; index < tbody.childElementCount; index++) {
            if(tbody.children[index].id == row.id){
                tbody.removeChild(tbody.children[index]);
            }            
        }
        localStorage.removeItem(`task${row.id}`);
    }
})