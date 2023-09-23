const containerComments = document.querySelector('#container-comments');
const COMMENT = document.querySelector('#comment');
const INPUT_USER = document.querySelector('#input-user');
const INPUT_IMAGE = document.querySelector('#input-image-user');
const SEND_COMMENT_BUTTON = document.querySelector('#send-comment');
const ALL_COMMENTS_BUTTON = document.querySelector('#all-comments');
const ICON_COMMENTS = document.querySelector('#icon-comments');
const TOTAL_COMMENTS = document.querySelector('#total-comments');
const URL_FIREBASE_COMMENTS = "https://desafiojs-147da-default-rtdb.firebaseio.com/"+ID_POST+"/Comentarios.json";
let comentarios = [];

SEND_COMMENT_BUTTON.addEventListener('click',() => {

    if(!validaForm()){
        return;
    }else{
        const comment_ = {
            'Comentario': COMMENT.value,
            'User': INPUT_USER.value,
            'UserImage': INPUT_IMAGE.value,
            'Date': '03/12/2023'
        };
        comentarios.push(comment_);
        postComment(comentarios);
    }
    
});

ALL_COMMENTS_BUTTON.addEventListener('click',(e) => {
    const commentsHide = document.querySelectorAll('.d-none');
    commentsHide.forEach((element) => {
        element.classList.remove('d-none');
    });
    e.target.style.display = 'none';
});

ICON_COMMENTS.addEventListener('click',() => {
    containerComments.scrollIntoView({behavior: 'smooth'});
});

const getComments = async() => {
    try{
        const response = await fetch(URL_FIREBASE_COMMENTS, {method:'GET'});
        comentarios = await response.json();
        if(comentarios != null){
            TOTAL_COMMENTS.textContent = comentarios.length;
            renderComments(comentarios);
        }else{
            TOTAL_COMMENTS.textContent = 0;
        }
    } catch(error){
        console.log(error);
    }
};

const renderComments = (list) => {
    list.forEach((comment,index) => {
        renderComment(comment,index);
    });
};

const renderComment = (comment, index) =>{
    const divComments = document.createElement('div');
    const divProfilePicture = document.createElement('div');
    const divCircle = document.createElement('div');
    const divCommentsBox = document.createElement('div');
    const labelUser = document.createElement('label');
    const labelDate = document.createElement('label');
    const pComment = document.createElement('p');
    const divSpace = document.createElement('div');

    if(index  > 0){        
        divComments.className = 'comments d-none';
        divSpace.className = 'container_space d-none';
    }else{
        divComments.className = 'comments';
        divSpace.className = 'container_space';
    }

    //divComments.className = 'comments';
    divProfilePicture.className = 'profile_picture';
    divCircle.className = 'circle-3';
    divCommentsBox.className = 'comment_box';
    labelUser.className = 'comment__autor';
    labelDate.className = 'comment__date';
    //divSpace.className = 'container_space';

    divCircle.style.backgroundImage = "url("+comment.UserImage+")";
    labelUser.textContent = comment.User;
    labelDate.textContent = " • "+comment.Date;
    pComment.textContent = comment.Comentario;

    containerComments.appendChild(divComments);
    divComments.appendChild(divProfilePicture);
    divProfilePicture.appendChild(divCircle);    
    divComments.appendChild(divCommentsBox);    
    divCommentsBox.appendChild(labelUser);
    divCommentsBox.appendChild(labelDate);
    divCommentsBox.appendChild(pComment);    
    containerComments.appendChild(divSpace);
};

const postComment = async (comments) => {
    const response = await fetch(URL_FIREBASE_COMMENTS, {
        method: 'PUT',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(comments)
        
    });

    if(response.status === 200){
        alert("Comentario guardado exitosamente");
        window.location.reload();
    }
    else{
        alert("Se presento un error");
    }
};

const validaForm = () => {
    let result = true;
    if(COMMENT.value.trim() === ""){
        COMMENT.className = 'form-control is-invalid';
        result = false;
    }else{
        COMMENT.className = 'form-control';
    }
    if(INPUT_USER.value.trim() === ""){
        INPUT_USER.className = 'form-control is-invalid';
        result = false;
    }else{
        INPUT_USER.className = 'form-control';
    }
    if(INPUT_IMAGE.value.trim() === ""){
        INPUT_IMAGE.className = 'form-control is-invalid';
        result = false;
    }else{
        INPUT_IMAGE.className = 'form-control';
    }
    return result;
};

getComments();