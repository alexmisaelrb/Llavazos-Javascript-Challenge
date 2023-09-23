const IMAGE_POST = document.querySelector('#image-post');
const USER_NAME = document.querySelector('#user-name');
const USER_IMAGE = document.querySelector('#user-image');
const TEAM_NAME = document.querySelector('#team-name');
const DATE_POST = document.querySelector('#date-post');
const TITLE_POST = document.querySelector('#title-post');
const TAGS_POST = document.querySelector('#tags-post');
const CONTENT_POST = document.querySelector('#content-post');
const USER_IMAGE_TITLE = document.querySelector('#user-image-title');
const USER_TITLE = document.querySelector('#user-title');
const USER_NAME_PROFILE = document.querySelector('#user-name-profile');
const TITLE_PAGE = document.querySelector('#title-page');
const EDIT_BUTTON = document.querySelector('#edit-post');
const DELETE_BUTTON = document.querySelector('#delete-post');
const SEARCH_BUTTON = document.querySelector('#searchButton');
const SEARCH_QUERIES_CONTENT = document.querySelector('#searchQueriesContent');
const CREATE_BUTTON  = document.querySelector('#create_post_button');
const URL_POST = new URLSearchParams(window.location.search);
const ID_POST = URL_POST.get('id');
const URL_FIREBASE = "https://desafiojs-147da-default-rtdb.firebaseio.com/"+ID_POST+".json";

EDIT_BUTTON.addEventListener('click',() => {
    window.location.href = '../EditPost/?id='+ID_POST;
});

DELETE_BUTTON.addEventListener('click',() => {
    deletePost();
});

SEARCH_BUTTON.addEventListener('click', (event) =>{
    let elementToFind = SEARCH_QUERIES_CONTENT.value;
    window.location.href = '../searchQueries/?string=' + elementToFind;

})

CREATE_BUTTON.addEventListener('click', () => {
    window.location.href = '/CreatePost/'

})

const renderPost = async () =>{
    try{
        const response = await fetch(URL_FIREBASE, {method:'GET'});
        const parsed = await response.json();
        USER_TITLE.textContent = parsed['User']['Name'];
        USER_NAME_PROFILE.textContent = parsed['User']['Name'];
        USER_IMAGE_TITLE.setAttribute('src',parsed['User']['URL']);
        if(parsed['Image'] === ""){
            IMAGE_POST.style.display = 'none';    
        }else{
            IMAGE_POST.setAttribute('src',parsed['Image']);
        }        
        if(parsed['TeamName'] != ""){
            USER_NAME.textContent = parsed['User']['Name']+" for "+parsed['TeamName'];
        }else{
            USER_NAME.textContent = parsed['User']['Name'];
        }
        USER_IMAGE.style.backgroundImage = "url("+parsed['User']['URL']+")";
        DATE_POST.textContent = parsed['DatePost'];
        TITLE_POST.textContent = parsed['Title'];
        TITLE_PAGE.textContent = parsed['Title'];
        CONTENT_POST.textContent = parsed['Contenido'];
        renderTags(parsed['Tags']);
    } catch(error){
        console.log(error);
    }
};

const renderTags = (tags) => {
    tags.forEach((tag) => {
        const li = document.createElement('li');
        li.className = 'card__tag me-2';
        li.textContent = tag;
        TAGS_POST.appendChild(li);
    });
};

const deletePost = async () => {
    const response = await fetch(URL_FIREBASE, {
        method: 'DELETE'
    });
    if(response.status === 200){
        window.location.href = '../index.html';
    }else{
        alert('Se presento un error al intentar eliminar el post');
    }
}

renderPost();
