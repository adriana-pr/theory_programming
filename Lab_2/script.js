let todoList = []

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let inputToDo=document.querySelector('.inputToDo');

if(localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
  showTodo();
}

// localStorage.clear();

function newTodo() {
  if(inputToDo.value!=''){
    let newTodoBlok = {
      text: inputToDo.value,
      checked: false,
    }
    inputToDo.value = '';
    todoList.push(newTodoBlok);
    localStorage.setItem('todo',JSON.stringify(todoList));
    showTodo();
  }
}

function showTodo(){
  list.innerHTML='';
  uncheckedCountSpan.innerHTML=0;
  todoList.forEach(function(elem){
    list.innerHTML+=`<li>
    <input class="input" type="checkbox" ${elem.checked  ? 'checked':'' }>
    <span> ${elem.text}</span>
    <button class="btn">Delete</button>
    </li>`;

    if(elem.checked){
      ++uncheckedCountSpan.innerText;
    }
  });
  itemCountSpan.innerText=todoList.length;
}

list.addEventListener('click', (e)=>{
  if(e.target.classList.contains('input')){
    doneTodo(e);
  }
  if(e.target.classList.contains('btn')){
    removeTodo(e);
  }
});

function removeTodo(e){
  let name = e.target.closest('li').innerText.slice(1,-7);
  todoList.forEach(function(element,i){
   if(element.text==name){
   todoList.splice(i,1);
   }
   if(element.text==name && element.checked){
    --uncheckedCountSpan.innerText;
   }
  });
  localStorage.setItem('todo',JSON.stringify(todoList));
  itemCountSpan.innerText=todoList.length;
  showTodo();
}

function doneTodo(e){
  uncheckedCountSpan.innerText=0;
  let name = e.target.closest('li').innerText.slice(1,-7);
  todoList.forEach(function(element){
   if(element.text==name){
    element.checked = !element.checked ;
   }
   if(element.checked){
    ++uncheckedCountSpan.innerText;
   }
  });
  localStorage.setItem('todo',JSON.stringify(todoList));
  showTodo();
}
