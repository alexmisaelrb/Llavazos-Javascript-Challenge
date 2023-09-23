const URL_FIREBASE = 'https://desafiojs-147da-default-rtdb.firebaseio.com/'
const search = window.location.search  
const url = new URLSearchParams(search) 
const ID_POST = url.get('id')        

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


const getInfoById = async() => {
    const url = URL_FIREBASE + ID_POST + '.json';
    const info = await fetch(url)
    const parsed = await info.json()
    console.log(parsed)
    inputTitle.value = parsed.Title
    inputUsuario.value = parsed.User.Name
    inputURLavatar.value = parsed.User.URL
    inputTeamName.value = parsed.TeamName
    inputPostContent.value = parsed.Contenido
    inputCoverImage.value = parsed.Image
    inputTags.value = parsed.Tags
}
getInfoById()


const updatePost = async() => {
    const post = {
        Title: inputTitle.value,
        Contenido: inputPostContent.value,
        TeamName: inputTeamName.value,
        Image: inputCoverImage.value,
        Tags: inputTags.value.split(','),
        User: {
            Name: inputUsuario.value,
            URL: inputURLavatar.value,
        }
    }

    const url = URL_FIREBASE + ID_POST + '.json';
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(post)
    })
    if(response.status === 200){
        window.location.href = '/Llavazos-Javascript-Challenge/Post/indexPs.html?id=' + ID_POST
    }
}

buttonPublish.addEventListener('click', () => {
    updatePost()
});