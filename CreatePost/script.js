const URL_FIREBASE = 'https://desafiojs-147da-default-rtdb.firebaseio.com/'    

const buttonEdit= document.querySelector('#editButton')
const buttonPreview= document.querySelector('#previewButton')
const buttonX= document.querySelector('#closeButton')
const buttonAddImage= document.querySelector('#addImgButton')
const buttonPublish = document.querySelector('#publishButton')
const buttonSaveDraft= document.querySelector('#draftButton')
const buttonOptions= document.querySelector('#optionsButton')
const buttonRevertNew= document.querySelector('#revertButton')
const inputTitle = document.querySelector('#cajaTxt__titulo')
const inputUsuario = document.querySelector('#usuario')
const inputURLavatar = document.querySelector('#url_avatar')
const inputTeamName = document.querySelector('#teamName')
const inputCoverImage = document.querySelector('#coverImg')
const inputPostContent = document.querySelector('#postContTxt')
const inputTags= document.querySelector('#tagTxt')


const createPost = async() => {
    
    let fechaActual = new Date();
    
    const post = {
        Title: inputTitle.value,
        Contenido: inputPostContent.value,
        TeamName: inputTeamName.value,
        Image: inputCoverImage.value,
        Tags: inputTags.value.split(','),
        Date: '22/09/2023',//fechaActual.format('DD/MM/YYYY'),
        User: {
            Name: inputUsuario.value,
            URL: inputURLavatar.value,
        }
    }

    const url = URL_FIREBASE + '.json';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(post)
    })
    if(response.status === 200){
        window.location.href = '/index.html';
    }
}

buttonPublish.addEventListener('click', () => {
    createPost()
});