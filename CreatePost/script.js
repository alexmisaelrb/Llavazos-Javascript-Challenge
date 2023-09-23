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
let posts;

const createPost = async() => {
    
    let fechaActual = new Date();
    const post = {
        Title: inputTitle.value,
        Contenido: inputPostContent.value,
        TeamName: inputTeamName.value,
        Image: inputCoverImage.value,
        Tags: inputTags.value.split(','),
        Date: '22/09/2023', //fechaActual.format('DD/MM/YYYY'),
        TimeRead: 3,
        User: {
            Name: inputUsuario.value,
            URL: inputURLavatar.value,
        }
    }

    posts.push(post);

    const url = URL_FIREBASE + '.json';
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(posts)
    })
    if(response.status === 200){
        window.location.href = '../index.html';
    }
}

buttonPublish.addEventListener('click', () => {
    createPost()
});

const getInfo = async() => {
    try {
        const url = URL_FIREBASE + '.json'
        const response = await fetch(url);
        if(response.status !== 201){
            const parsed = await response.json();
            posts = parsed;
        }

    } catch (error) {
        console.error(error, 'xxxx')
    }
};

const parserResponseFireBase = (response) => {
    const parsedResponse = []
        for(const key in response ){
            const element = {
                id: key,
                contenido: response[key].Contenido,
                datePost: response[key].DatePost,
                teamName: response[key].TeamName,
                image: response[key].Image,
                timeRead: response[key].TimeRead,
                user: response[key].User,
                title: response[key].Title,
                tags: response[key].Tags,
                comentarios: response[key].Comentarios,
            };
            parsedResponse.push(element)
            
        };
    return parsedResponse;
};

getInfo()