window.Sierra = {};
Sierra.loadCounter = 0;
Sierra.body = $('body bodycontent');
Sierra.user = {};

Sierra.onLoad = new QuickEvent();
Sierra.Load = () =>
{
    Sierra.loadCounter++;
    if (Sierra.loadCounter === 1)
    {
        setTimeout(() =>
        {
            Sierra.LoadPage('NotLoggedIn');
        }, 50);
    }
    else if (Sierra.loadCounter === 2)
    {
        Sierra.LoadPage('Parties');
        setTimeout(() =>
        {
            Sierra.body.html(Sierra.Component.Parse(Sierra.body.html()));
        }, 1000);
        console.log('Loaded.');
        Sierra.onLoad.trigger();
    }
};

Sierra.LoginSuccess = () =>
{
    firebase.database().ref('userlist/' + firebase.auth().currentUser.uid).once('value').then((data) =>
    {
        let username = data.val();
        firebase.database().ref('users/' + username).once('value').then((data) =>
        {
            Sierra.user.username = username;
            Sierra.user.id = firebase.auth().currentUser.uid;
            Sierra.user.data = data.val();
            Sierra.user.ref = firebase.database().ref('users/' + username);
            Sierra.Load();

        });
    });
};

Sierra.SignUpSuccess = (data) =>
{
    firebase.database().ref('users/' + data.username).set({
        uid: firebase.auth().currentUser.uid,
        public_data: {
            hash_tracker: firebase.database().ref('hash_trackers').push().key,
            name: data.name,
            username: data.username,
        },
        private_data: {
            email: data.email
        }
    });
    firebase.database().ref('userlist/' + firebase.auth().currentUser.uid).set(data.username);
};

Sierra.LoadPage = (page) =>
{
    page = page.toLowerCase();
    let $pageContent = $('div.page div.content');
    $pageContent.fadeOut(500);
    setTimeout(() =>
    {
        $pageContent.html(Sierra.Component.Parse(Sierra.ComponentManager.pages[page].template));
        $(() =>
        {
            Sierra.ComponentManager.pages[page].OnLoad();
            window.onresize();
        });
        $pageContent.fadeIn(500);
    }, 1000);
};

// URL parameters
// = = = = = = = =
Sierra.GetURLParameter = (name) =>
{
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
};

Sierra.ParseURL = ()=>
{
    let page = Sierra.GetURLParameter('page');
    Sierra.LoadPage(page);
};

// Misc
// = = = = = = = =
Sierra.readFile = (path, callback) =>
{
    return new Promise(function (resolve, reject)
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4)
            {
                if (xhr.status === 200)
                {
                    resolve(xhr.responseText);
                }
                else
                {
                    reject(xhr);
                }
            }
        };
        xhr.open("GET", path);
        xhr.send();
    });
};