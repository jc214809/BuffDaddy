function statusChangeCallback(response) {
    console.log('statusChangeCallback');

    if (response.status === 'connected') {
        testAPI(response.userID);
        alert("DO IT!");
        //window.location = '/workouts?userId=' + response.userID;
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        //document.getElementById('status').innerHTML = 'Please log ' +
        // 'into this app.';
    } else {
        alert("else");
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        //document.getElementById('status').innerHTML = 'Please log ' +
        // 'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '966190206783033',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI(userID) {
    //console.log('Welcome!  Fetching your information.... ');
    FB.api('me?fields=email,first_name,last_name,gender', function(response) { //,middle_name,cover,installed,name
        //console.log('Successful login for: ' + JSON.stringify(response));
        //document.getElementById('status').innerHTML =
        //   'Thanks for logging in, ' + response.first_name + ' ' + response.last_name + '!';
        $.ajax({
            url: 'http://localhost/BuffDaddyAPI/register',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'POST',
            data: JSON.stringify(response)
        }).done(function() {
            alert("Success");
        }).fail(function() {
            alert("fail");
        });
    });
}
