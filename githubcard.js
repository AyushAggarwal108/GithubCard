//Dom objects
const username = document.querySelector('.username')
const avatar = document.querySelector('.avatar')
const bio = document.querySelector('.bio')
const followers = document.querySelector('.followers')
const search = document.querySelector('input')
const submit = document.querySelector('button')
const message = document.querySelector('#message')
const link = document.querySelector('.link')

//logic

search.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        submit.click(); // 
    }})

submit.addEventListener('click', function () {
    const str = search.value.trim()
    if(str !== '') {
        check(str, function(isvalid, data) {
            if(isvalid === true) {
                message.innerHTML = 'User Founded!'
                username.innerHTML = `${str}`
                avatar.src = `${data.avatar_url}`
                bio.innerHTML = `${data.bio}`
                followers.innerHTML = `Followers : ${data.followers}`
                link.href = `${data.html_url}`
            }   
            else {
                message.innerHTML = 'User Not Found'
                username.innerHTML = `Username`
                avatar.src = `no-title.jpg`
                bio.innerHTML = `This is a short bio about the user. It can be a brief description of their interests, skills, or anything they want to share.`
                followers.innerHTML = `Followers :`
                link.removeAttribute('href')
            }
        })
        message.style.visibility = 'visible'
        message.style.opacity = '1';
        search.value = ''
    }
})


//function done by hoisting

const check = function(val, callback) {
    let tosearch = 'https://api.github.com/users/' + val
    let xhr = new XMLHttpRequest()
    let data
    xhr.open('GET', tosearch)
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 || xhr.status === 200) {
            data = JSON.parse(xhr.responseText)
            if("login" in data) {
                callback(true, data)
            }
            else callback(false,{})
        }
    }
    xhr.send()
}
