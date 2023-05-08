const body = document.querySelector('body');                            //body태그
const toggle = document.querySelector('.change__mode');                 //라이트모드 다크모드 버튼
const prevent_side = document.querySelector('.user_status__wrapper');   //사이드바 안에 유저 정보 박스
const id = document.querySelector('.user__ID');                         //회원가입할때 아이디입력하는 input태그
const phone = document.querySelector('.user__phone');                   //회원가입할때 전화번호입력하는 input태그
const pw = document.querySelector('.user__pw');                         //회원가입할때 비밀번호입력하는 input태그
const pwrc = document.querySelector('.user__pwrc');                     //회원가입할때 비밀번호재확인 입력하는 input태그
const logoutBtn = document.querySelector('.logout__btn')                //사이드바안에 로그아웃버튼태그
const deleteBtn = document.querySelector('.delete__user')               //사이드바안에 계정삭제버튼태그
const changeBtn = document.querySelector('.change__pw')                 //사이드바안에 비밀번호변경버튼 태그
let side_open = 0;                                                      //사이드바가 열려있는지의 유무

//-----------------//
//회원가입버튼을 눌렀을때 각각의 정보들이 형식에 맞는지 체크하는 변수들 모두 1일경우에만 회원가입 기능 작동//
let sign_name_check = 0;       //회원가입창에서 이름 입력할때 조건에 맞는지 체크하는 변수
let sign_id_check = 0;         //회원가입창에서 아이디 입력할때 조건에 맞는지 체크하는 변수
let sign_phone_check = 0;      //회원가입창에서 전화번호 입력할때 조건에 맞는지 체크하는 변수
let sign_pw_check = 0;         //회원가입창에서 비밀번호 입력할때 조건에 맞는지 체크하는 변수
let sign_pwrc = 0;             //회원가입창에서 비밀번호 재확인 입력할때 조건에 맞는지 체크하는 변수
//-----------------//

//-----------------//
//현재 로그인 한 유저의 정보들
let logined_id = '';           //로그인한 계정의 아이디                                   
let logined_phone = '';        //로그인한 계정의 휴대폰전화번호                    
let logined_pw = '';           //로그인한 계정의 패스워드
let logined_name = '';         //로그인한 계정의 이름
//-----------------//

let exist_users = {};          //로컬스토리지에 저장된 유저정보들
let new_user = {};             //회원가입할때 추가해줄 계정

//로그아웃 될때 기존에 content__wrapper에 있는 내용들을 삭제하고 다시 로그인 창을 뜨게 할때 사용할 html요소들
const login_form = ' <div class="login__container"><div class="IP__box"><p>ID</p><input class="input__id" type="text" placeholder="ID"></div><div class="IP__box"><p>PW</p><input class="input__pw" type="password" placeholder="PASSWORD"></div><div class="login__signup__box"><button class="login">로그인</button><button class="signin">회원가입</button></div></div>'

//로그인 버튼을 눌렀을때 조건들이 맞으면 실행하게 할 함수
function when_login (){
    //기존에 로그인을 했었다면 load이벤트발생당시 로컬스토리지에서 저장된 id꺼내와 logined_id에 할당, 기존에 로그인된 정보가 없다면 로그인창에 입력한 id를 logined_id에 할당
    logined_name = JSON.parse(localStorage.getItem('users'))[logined_id]['name'];       //스토리지에 저장된 유저정보에 id값의 name할당 
    logined_phone = JSON.parse(localStorage.getItem('users'))[logined_id]['phone'];     //스토리지에 저장된 유저정보에 id값의 phone할당

    //------------------------------------------------------------------------------//
    //content__wrapper의 자식요소를 removeChilde로 삭제후 append해줄 내용들(content__wrapper안에는 하나의 자식밖에 없음,로그인창)
    let parent = document.querySelector('.content__wrapper');                           //content__wrapper                           
    document.querySelector('.content__wrapper').removeChild(parent.children[0]);        //content__wrapper의 자식 요소 제거(로그인창밖에 없음)
    let addElement = document.createElement('h1');                                      //간단한 h1태그 생성
    addElement.textContent = `${logined_name}님 안녕하세요.`;                              //위에서 지정한 로그인된 유저의 이름+안녕하세요를 h1태그의 텍스트컨텐츠로 설정
    parent.append(addElement);                                                          //생성한 h1태그를 content__wrapper에 append함
    //------------------------------------------------------------------------------//

    
    document.querySelector('.login__user__name').textContent = logined_name;            //사이드바에 로그인한 유저의 이름 최신화
    document.querySelector('.login__uesr__ID').textContent = logined_id;                //사이드바에 로그인한 유저의 아이디 최신화
    document.querySelector('.login__user__phone').textContent = logined_phone;          //사이드바에 로그이한 유저의 전번 최신화
    logoutBtn.style.display='inline-block';                                             //로그인이 되었으니 로그아웃버튼 보여줌
    deleteBtn.style.display='inline-block';                                             //로그인이 되었으니 회원탈퇴버튼 보여줌
    changeBtn.style.display='inline-block';                                             //로그인이 되었으니 비밀번호변경버튼 보여줌
    localStorage.setItem('who_login',logined_id);                                       //로그인이 되었으니 사이트를 나가도 로그인한 유저의 id를 로컬스토리지에 저장하여 로그인유지기능
}

//로그아웃 기능이 담겨있는 함수, 회원탈퇴시, 비밀번호 변경시, 로그아웃 버튼클릭시 실행되는 함수
function when_logout (){
    //---------------------------------//
    //content__wrapper의 자식요소를 removeChilde로 삭제후 다시 로그인창을 append해줌 (content__wrapper안에는 하나의 자식밖에 없음,로그인한 유저이름+안녕하세요.)
    let parent = document.querySelector('.content__wrapper')
    document.querySelector('.content__wrapper').removeChild(parent.children[0]);
    parent.innerHTML = login_form;
    //---------------------------------//

    document.querySelector('.login__user__name').textContent = 'none';                  //로그아웃이 되었으니 사이드바의 유저이름 'none'으로 할당
    document.querySelector('.login__uesr__ID').textContent = 'none';                    //로그아웃이 되었으니 사이드바의 유저아이디 'none'으로 할당
    document.querySelector('.login__user__phone').textContent = 'none';                 //로그아웃이 되었으니 사이드바의 유저전번 'none'으로 할당
    logoutBtn.style.display='none';                                                     //로그아웃이 되었으니 로그아웃버튼 가리기
    deleteBtn.style.display='none';                                                     //로그아웃이 되었으니 회원탈퇴버튼 가리기
    changeBtn.style.display='none';                                                     //로그아웃이 되었으니 비밀번호변경버튼 가리기
    localStorage.removeItem('who_login');                                               //로컬스토리지에 로그인유지하게 해주는 데이터삭제
}



window.addEventListener('load',function (){//처음 페이지가 열릴때 load가 발생하면 즉 처음 정보들을 로딩할때 발생하는 이벤트
    localStorage.getItem('users') == undefined                      //로컬스토리지에 'users'라는 키를 가진 데이터가 존재하면 exist_users에 복사
        ? undefined                                                 
        : exist_users = JSON.parse(localStorage.getItem('users'));

    localStorage.getItem('dark__mode') == undefined                 //로컬스토리지에 다크모드에 대한 정보가 존재한다면 'dark__mode'라는 클래스를 body에 토글해줌
        ? localStorage.setItem('dark__mode',false) 
        : (JSON.parse(localStorage.getItem('dark__mode')) 
            ? body.classList.toggle('dark-mode') : undefined)

    localStorage.getItem('who_login') == undefined                  //기존에 로그인해놓은 기록이 있다면 logined_id는 로컬스토리지에 저장된 현재 로그인한 유저 id저장
        ? undefined 
        : (logined_id = localStorage.getItem('who_login'),when_login())
})



toggle.addEventListener('click', ()=>{      //라이트모드 다크모드 클릭시 dark-mode라는 클래스 토글해줌, 토글과 동시에 dark-mode가 켜지면 로컬에 true로 저장하고 아니면 false로 저장
    body.classList.toggle('dark-mode');
    body.classList.contains('dark-mode') ? (toggle.textContent = '라이트모드', localStorage.setItem('dark__mode',true)): (toggle.textContent = '다크모드', localStorage.setItem('dark__mode', false))
})

document.querySelector('.signin').addEventListener('click',function (){ //회원가입 버튼 눌렀을때 회원가입 창 보여줌
    document.querySelector('.signin__modal').style.display = "block"
})

document.querySelector('.signin__modal__cancle').addEventListener('click',function (){  //회원가입창에서 취소누르면 회원가입창 닫아줌
    document.querySelector('.signin__modal').style.display = "none"
})

prevent_side.addEventListener('click',function (e){         //사이드바에서 유저정보들을 눌렀을때 사이드바가 닫히는걸 방지하기 위해 이벤트를 막아둠
    e.stopPropagation();
})

document.addEventListener('click',function(e){          //문서안에서 클릭이벤트 발생시
    if(e.target.classList.contains('side__btn') && side_open == 0){         //side_open이 0인경우 즉 열리지 않았다면 오른쪽으로 500px움직여주는 moving 클래스 토글
        document.querySelector('.user__status').classList.toggle('moving');
        side_open = 1;
    } else if (!e.target.classList.contains('user__status') && side_open == 1) { //side_open이 1인경우 즉 사이드바가 열려있고 사이드바 이외의 공간을 클릭시 moving 클래스 토글
        document.querySelector('.user__status').classList.toggle('moving');
        side_open = 0;
    }

    if(e.target.className == "signin__modal__signup") {                     //회원가입창에서 최종적으로 회원가입을 누를때 각각의 정보들이 형식에 맞아서 모두 1이면 로컬스토리지에 등록이때 모든 조건들은 맞지만 id가 중복존재할경우 id가 이미 존재한다고 alert함
        let new_name = document.querySelector('.user__name').value;         //
        let new_id = document.querySelector('.user__ID').value;

        //회원가입의 조건들이 맞을경우 exist_users에 입력한 id를 키값으로 가지고 그 키의 밸류들은 유저의 정보들을 저장한 새로운 프로퍼티를 exist_users안에 생성해주고 로컬스토리지에 최신화된 exist_users를 저장함
        sign_id_check == 1 && sign_name_check == 1 && sign_phone_check == 1 && sign_pw_check == 1 && sign_pwrc == 1 && exist_users[new_id] == undefined//회원가입창에서 입력한 id가 exist_users안에 없다면 최초가입임으로 회원가입 성공
        ? (exist_users[new_id] = {'name':new_name, 'phone':phone.value, 'pw':pw.value},localStorage.setItem('users',JSON.stringify(exist_users)) , document.querySelector('.signin__modal').style.display = 'none' ,alert('회원가입 축하'), localStorage.getItem('users') == undefined ? undefined : exist_users = JSON.parse(localStorage.getItem('users')))
        : sign_id_check == 1 && sign_name_check == 1 && sign_phone_check == 1 && sign_pw_check == 1 && sign_pwrc == 1 && exist_users[new_id] != undefined//모든 조건들은 맞지만 id가 exist_users에 존재한다면 id가 중복되므로 회원가입 실패
        ? alert('이미 id가 존재')
        : alert('양식 재확인 부탁') 
    }

    if(e.target.className == 'login') {                                     //login버튼을 눌렀을때 발생함
        logined_id = document.querySelector('.input__id').value;            //로그인창에 입력한 id를 logined_id에 할당
        logined_pw = document.querySelector('.input__pw').value;            //로그인창에 입력한 pw를 logined_pw에 할당

        //로그인창에 입력한id와 exist_users에 저장된 pw가 일치하면 when_login(위쪽 참고) 실행시켜주고 나머지 경우 로그인 실패
        if(exist_users[logined_id] != undefined && exist_users[logined_id].pw == logined_pw) {
            //로그인창에 입력한 id를 가지고 로컬스토리지안의 users를 불러와 조회해서 존재한다면 logined_name에다가도 이름 부여 logiend_id가 존재하지 않으면 패스 
            JSON.parse(localStorage.getItem('users'))[logined_id] == undefined ? undefined : logined_name = JSON.parse(localStorage.getItem('users'))[logined_id].name;
            when_login();
            alert('로그인 성공')
        } else {
            alert('ID나 PW를 다시 확인해봐.')
        }
    }

    if(e.target.className == 'logout__btn') {                               //로그아웃버튼 눌렸을때 when_logout실행 위쪽 참고
        when_logout();
    }

    if(e.target.className == 'delete__user') {                              //계정탈퇴 버튼을 눌렀을경우
        let delete_pw = prompt('비밀번호를 입력해주세요.')                        //promt창을 띄우고 거기에 입력하는 값들을 delete_pw라는 변수에 저장
        delete_pw == JSON.parse(localStorage.getItem('users'))[logined_id]['pw']    //현재 계정의 비밀번호 즉 로컬스토리지에 저장된 로그인된 id의 비밀번호와 promt창에 입력한 비밀번호가 같으면 작동
        ? (alert('님 계정 삭제 성공'), delete exist_users[logined_id], localStorage.setItem('users',JSON.stringify(exist_users)) , when_logout()) //삭제된 프로퍼티를 exist_users에 최신화하고 로컬스토리지에 저장 후 로그아웃함수실행(계정이탈퇴되었으니 당연히 로그아웃시킴)
        : alert('비번이 달라요')                                                //비번이 다르면 회원탈퇴 불가
    }

    if(e.target.className == 'change__pw') {                                //비밀번호 변경 클릭시
        let c_p = prompt('현재 비밀번호 입력하세요');                             //prompt로 현재 비밀번호를 c_p변수에 저장
        if(c_p == JSON.parse(localStorage.getItem('users'))[logined_id]['pw']) {    //로컬스토리지에 현재의 비밀번호를 조회하여 c_p와 맞다면
            let require = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
            let d_p = prompt('바꿀 비밀번호 입력하세요')                            //바꿀 비밀번호를 prompt로 입력받고 d_p에 저장 
            if(require.test(d_p) && d_p != c_p) {                                           //입력받은 비밀번호가 형식에 맞는지 정규식으로 판별
                let temp_p = d_p;                                             //맞다면 다시 한번 더 prompt로 입력받아 바꾼 비밀번호를 잘 입력했는지 확인하고 같으면 exist_users에서 수정하고 로컬스토리지에 저장
                let rc_p = prompt('바꾼 비밀번호를 입력해주세요') 
                if(temp_p == rc_p) {
                    alert('비밀변호 변경 성공')
                    exist_users[logined_id]['pw'] = temp_p;
                    localStorage.setItem('users',JSON.stringify(exist_users));
                    when_logout();
                } else {                                                     //현재 비밀번호는 맞게 입력했지만 변경한 비밀번호를 확인하는 과정에서 다르게 입력하면 실패
                    alert('입력하신 비밀번호가 다릅니다')
                }
            
            } else {                                                        //바꾸고자 하는 번호가 정규식에서 통과하지 못하면 실패
                alert('비밀번호 양식을 확인해주세요');
            }

        } else {                                                            //현재 비밀번호를 잘못 입력한 경우
            alert('현재 비밀번호와 다릅니다.')
        }
    }
})

document.addEventListener('input', function (e){//문서안에서 입력이라는 이벤트가 발생시 아래의 내용들 실행
    if(e.target.className == 'user__name') {    //회원가입창에서 이름이 입력받을 경우 길이가 2자보다 작으면 경고문을 계속 block으로 처리해서 보여주고 2자이상이 되면 경고문을 지워주고 위에서 선언한 조건중 이름 sign_name_check 1로 변경
        document.querySelector('.user__name').value.length < 2 
        ? (document.querySelector('.check__name').style.display = 'block',sign_name_check = 0) 
        : (document.querySelector('.check__name').style.display = 'none',sign_name_check = 1)
    }

    if(e.target.className == 'user__ID') {      //회원가입창에서 id가 입력받을 경우 5자보다 작으면 경고문을 계속 block처리하고 5자 이상이 되면 sign_id_chekc도 1로 바꾸고 경고문도 없앰
        document.querySelector('.user__ID').value.length < 5 
        ? (document.querySelector('.check__ID').style.display = 'block',sign_id_check = 0) 
        : (document.querySelector('.check__ID').style.display = 'none',sign_id_check = 1)
    }

    if(e.target.className == 'user__phone') {   //회원가입창에서 id가 입력받을 경우 5자보다 작으면 경고문을 계속 block처리하고 5자 이상이 되면 조건도 1로 바꾸고 경고문도 없앰
        document.querySelector('.user__phone').value.length != 11 
        ? (document.querySelector('.check__phone').style.display = 'block',sign_phone_check = 0) 
        : (document.querySelector('.check__phone').style.display = 'none',sign_phone_check = 1)
    }

    if(e.target.className == 'user__pw') {      //회원가입창에서 pw가 정규식에 안 맞을 경우 경고문을 계속 block처리하고 정규식에 맞으면 sign_pw_check도 1로 바꾸고 경고문도 없앰
        let require = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        !require.test(document.querySelector('.user__pw').value) 
        ? (document.querySelector('.check__PW').style.display = 'block',sign_pw_check = 0) 
        : (document.querySelector('.check__PW').style.display = 'none',sign_pw_check = 1)
    }
    if(e.target.className == 'user__pwrc') {    //pw랑 같으면 sign_pwrc=1 아니면 0 유지 
        e.target.value != document.querySelector('.user__pw').value 
        ? (document.querySelector('.check__pwrc').style.display = 'block',sign_pwrc = 0) 
        : (document.querySelector('.check__pwrc').style.display = 'none',sign_pwrc = 1)
    }
})

