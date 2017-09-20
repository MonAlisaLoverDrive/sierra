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
            $('div.page div.content').html(Sierra.Component.Parse(Sierra.ComponentManager.components['NotLoggedIn'].template));
            window.onresize();
        }, 50);
    }
    else if (Sierra.loadCounter === 2)
    {
        console.log(window.Sierra.ComponentManager.components);
        window.Sierra.body.html(Sierra.Component.Parse(window.Sierra.body.innerHTML));
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
            avatar: data.avatar,
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