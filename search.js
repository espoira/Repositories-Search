'use strict';
 
let form = document.querySelector('form');
form.addEventListener('submit', formSubmit);
 
 
function addRepository(data) {

  document.querySelector('a').textContent = data.name;
  document.querySelector('a').href = data.html_url;
  
  document.getElementById('owner').textContent = 'Владелец: ' + data.owner.login;
  document.getElementById('description').innerHTML = (data.description) ?
           '<b>Описание: </b>' + data.description : 'Нет описания';

  document.querySelector('.repo-element').insertAdjacentHTML('afterend', 
       '<div>' + document.querySelector('.repo-element').innerHTML + '</div>');  
	   
  document.querySelector('span').textContent = '';
  
}


function formSubmit(e) {

  e.preventDefault();
  
  let repos = [];
  let message = 'Подождите, пожалуйста...';
 
  let subName = document.getElementById('repo-name').value;
  
  if (!subName.trim()) {
	  
    message = 'Введите текст в строку поиска!';
	
  } else {

    fetch(`https://api.github.com/search/repositories?q=${subName}`).then(

      async (response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          const data = await response.json();
          message = 'Повторите позже';
          return await Promise.reject(message);
        }
      }).then(
	
	  data => {
		  
        repos = data.items.slice(0, 10);
       
        if (repos.length != 0) {
			
          repos.forEach( 
		    item => addRepository(item) 
		  );
		  
        } else {
			
          message = 'Ничего не найдено';		  
		}
		
        this.reset();
		
    }).catch(
	
	  err => {
        message = err;
		
    });	
  }
  
  document.querySelector('span').textContent = message;
  
}
