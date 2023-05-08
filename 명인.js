const body = document.querySelector('body');
const toggle = document.querySelector('.change__mode');
const prevent_side = document.querySelector('.user_status__wrapper');
const id = document.querySelector('.user__ID');
const phone = document.querySelector('.user__phone');
const pw = document.querySelector('.user__pw');
const pwrc = document.querySelector('.user__pwrc');
const logoutBtn = document.querySelector('.logout__btn')
const deleteBtn = document.querySelector('.delete__user')
const changeBtn = document.querySelector('.change__pw')
let side_state = 0;
let login_status = 0;
let sign_name_check = 0;
let sign_id_check = 0;
let sign_phone_check = 0;
let sign_pw_check = 0;
let sign_pwrc = 0;
let logined_id = '';
let logined_phone = '';
let logined_pw = '';
let logined_name = '';

let exist_users = {};
let new_user = {};

const login_form = ' <div class="login__container"><div class="IP__box"><p>ID</p><input class="input__id" type="text" placeholder="ID"></div><div class="IP__box"><p>PW</p><input class="input__pw" type="password" placeholder="PASSWORD"></div><div class="login__signup__box"><button class="login">로그인</button><button class="signin">회원가입</button></div></div>'

function when_login (){
    logined_name = JSON.parse(localStorage.getItem('users'))[logined_id]['name'];
    logined_phone = JSON.parse(localStorage.getItem('users'))[logined_id]['phone']
    let parent = document.querySelector('.content__wrapper')
    document.querySelector('.content__wrapper').removeChild(parent.children[0]);
    let addElement = document.createElement('h1');
    addElement.textContent = `${logined_name}님 안녕하세요.`
    parent.append(addElement);
    document.querySelector('.login__user__name').textContent = logined_name;
    document.querySelector('.login__uesr__ID').textContent = logined_id;
    document.querySelector('.login__user__phone').textContent = logined_phone;
    logoutBtn.style.display='inline-block';
    deleteBtn.style.display='inline-block';
    changeBtn.style.display='inline-block';
    localStorage.setItem('who_login',logined_id);
}

function when_logout (){
    let parent = document.querySelector('.content__wrapper')
    document.querySelector('.content__wrapper').removeChild(parent.children[0]);
    parent.innerHTML = login_form;
    document.querySelector('.login__user__name').textContent = 'none';
    document.querySelector('.login__uesr__ID').textContent = 'none';
    document.querySelector('.login__user__phone').textContent = 'none';
    logoutBtn.style.display='none';
    deleteBtn.style.display='none';
    changeBtn.style.display='none';
    localStorage.removeItem('who_login');
}


window.addEventListener('load',function (){
    localStorage.getItem('users') == undefined ? undefined : exist_users = JSON.parse(localStorage.getItem('users'));
    localStorage.getItem('dark__mode') == undefined ? localStorage.setItem('dark__mode',false) : (JSON.parse(localStorage.getItem('dark__mode')) ? body.classList.toggle('dark-mode') : undefined)
    localStorage.getItem('who_login') == undefined ? undefined : (logined_id = localStorage.getItem('who_login'),when_login())
})



toggle.addEventListener('click', ()=>{
    body.classList.toggle('dark-mode');
    body.classList.contains('dark-mode') ? (toggle.textContent = '라이트모드', localStorage.setItem('dark__mode',true)): (toggle.textContent = '다크모드', localStorage.setItem('dark__mode', false))
})

document.querySelector('.signin').addEventListener('click',function (){
    document.querySelector('.signin__modal').style.display = "block"
})

document.querySelector('.signin__modal__cancle').addEventListener('click',function (){
    document.querySelector('.signin__modal').style.display = "none"
})

prevent_side.addEventListener('click',function (e){
    e.stopPropagation();
})

document.addEventListener('click',function(e){
    if(e.target.classList.contains('side__btn') && side_state == 0 && login_status == 0) {
        document.querySelector('.user__status').classList.toggle('moving');
        side_state=1;
    } else if (!e.target.classList.contains('user__status') && side_state == 1 && login_status == 0) {
        document.querySelector('.user__status').classList.toggle('moving');
        side_state=0;
    }

    if(e.target.className == "signin__modal__signup") {
        let new_name = document.querySelector('.user__name').value;
        let new_id = document.querySelector('.user__ID').value;
        sign_id_check == 1 && sign_name_check == 1 && sign_phone_check == 1 && sign_pw_check == 1 && sign_pwrc == 1 && exist_users[new_id] == undefined
        ? (exist_users[new_id] = {'name':new_name, 'phone':phone.value, 'pw':pw.value},localStorage.setItem('users',JSON.stringify(exist_users)) , document.querySelector('.signin__modal').style.display = 'none' ,alert('회원가입 축하'), localStorage.getItem('users') == undefined ? undefined : exist_users = JSON.parse(localStorage.getItem('users')))
        : sign_id_check == 1 && sign_name_check == 1 && sign_phone_check == 1 && sign_pw_check == 1 && sign_pwrc == 1 && exist_users[new_id] != undefined
        ? alert('이미 id가 존재')
        : alert('양식 재확인 부탁') 
    }

    if(e.target.className == 'login') {
        logined_id = document.querySelector('.input__id').value;
        logined_pw = document.querySelector('.input__pw').value;
        JSON.parse(localStorage.getItem('users'))[logined_id] == undefined ? undefined : logined_name = JSON.parse(localStorage.getItem('users'))[logined_id].name;
        if(exist_users[logined_id] != undefined && exist_users[logined_id].pw == logined_pw) {
            when_login();
            alert('로그인 성공')
        } else if(exist_users[logined_id] != undefined && exist_users[logined_id].pw != logined_pw){
            alert('ID나 PW를 다시 확인해봐.')
        } else {
            alert('ID나 PW를 다시 확인해봐.')
        }
    }

    if(e.target.className == 'logout__btn') {
        when_logout();
    }

    if(e.target.className == 'delete__user') {
        let delete_pw = prompt('비밀번호를 입력해주세요.')
        delete_pw == JSON.parse(localStorage.getItem('users'))[logined_id]['pw'] ? (alert('님 계정 삭제 성공'), delete exist_users[logined_id], localStorage.setItem('users',JSON.stringify(exist_users)) , when_logout()) : alert('비번이 달라요')
    }

    if(e.target.className == 'change__pw') {
        let c_p = prompt('현재 비밀번호 입력하세요');
        if(c_p == JSON.parse(localStorage.getItem('users'))[logined_id]['pw']) {
            let require = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
            let d_p = prompt('바꿀 비밀번호 입력하세요')
            if(require.test(d_p)) {
                let temp_p = d_p;
                let rc_p = prompt('바꾼 비밀번호를 입력해주세요') 
                if(temp_p == rc_p) {
                    alert('비밀변호 변경 성공')
                    exist_users[logined_id]['pw'] = temp_p;
                    localStorage.setItem('users',JSON.stringify(exist_users));
                    when_logout();
                } else {
                    alert('입력하신 비밀번호가 다릅니다')
                }
            
            } else {
                alert('비밀번호 양식을 확인해주세요');
            }

        } else {
            alert('현재 비밀번호와 다릅니다.')
        }
    }

})

document.addEventListener('input', function (e){
    if(e.target.className == 'user__name') {
        document.querySelector('.user__name').value.length < 2 ? (document.querySelector('.check__name').style.display = 'block',sign_name_check = 0) : (document.querySelector('.check__name').style.display = 'none',sign_name_check = 1)
    }

    if(e.target.className == 'user__ID') {
        document.querySelector('.user__ID').value.length < 5 ? (document.querySelector('.check__ID').style.display = 'block',sign_id_check = 0) : (document.querySelector('.check__ID').style.display = 'none',sign_id_check = 1)
    }

    if(e.target.className == 'user__phone') {
        document.querySelector('.user__phone').value.length != 11 ? (document.querySelector('.check__phone').style.display = 'block',sign_phone_check = 0) : (document.querySelector('.check__phone').style.display = 'none',sign_phone_check = 1)
    }

    if(e.target.className == 'user__pw') {
        let require = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        !require.test(document.querySelector('.user__pw').value) ? (document.querySelector('.check__PW').style.display = 'block',sign_pw_check = 0) : (document.querySelector('.check__PW').style.display = 'none',sign_pw_check = 1)
    }
    if(e.target.className == 'user__pwrc') {
        e.target.value != document.querySelector('.user__pw').value ? (document.querySelector('.check__pwrc').style.display = 'block',sign_pwrc = 0) : (document.querySelector('.check__pwrc').style.display = 'none',sign_pwrc = 1)
    }
})

