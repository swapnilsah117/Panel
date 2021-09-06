var loggedIn = false;
window.fbAsyncInit = function () {
    FB.init({
        appId: '1018617218893479',
        cookie: true,
        xfbml: true,
        version: 'v11.0',
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log(response);
        console.log('Logged in and authenticated');
        document.cokkie = response.authResponse;
        loggedIn = true;
        showMessage();
        showProfile();
    } else {
        console.log('Not authenticated');
        allHidden();
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function logout() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            FB.logout(function (response) {
                // this part just clears the $_SESSION var
                // replace with your own code
                var loggedIn = false;
                allHidden();
                hideLogout();
            });
        }
    });
}

function allHidden() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('content-posts').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    hideLogout();
}

function showProfile() {
    if (loggedIn === true) {
        console.log('Profile Shown');
        document.getElementById('profile').style.display = 'inline';
    } else {
        console.log('NO');
    }
}
function showMessage() {
    if (loggedIn === true) {
        console.log('HidePosts');
        document.getElementById('content').style.display = 'inline-flex';
        document.getElementById('content-posts').style.display = 'none';
        selectMsgIcon();
        replaceLogIn();
    }
}
function showPosts() {
    if (loggedIn === true) {
        console.log('Hide Msg');
        document.getElementById('content').style.display = 'none';
        document.getElementById('content-posts').style.display = 'inline-flex';
        selectPostIcon();
    }
}
function selectMsgIcon() {
    document.getElementById('messages-icon').classList.add('selectedBtn');
    document.getElementById('post-icon').classList.remove('selectedBtn');
}

function selectPostIcon() {
    document.getElementById('messages-icon').classList.remove('selectedBtn');
    document.getElementById('post-icon').classList.add('selectedBtn');
}

function replaceLogIn() {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('logout-div').style.display = 'inline-flex';
}

function hideLogout() {
    document.getElementById('login-button').style.display = 'inline-flex';
    document.getElementById('logout-div').style.display = 'none';
}
