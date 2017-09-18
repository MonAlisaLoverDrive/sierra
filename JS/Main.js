window.Sierra = {};
Sierra.loadCounter = 0;
Sierra.body = $('body bodycontent');
Sierra.user = {};

Sierra.Load = () =>
{
    Sierra.loadCounter++;
    if (Sierra.loadCounter > 1)
    {
        console.log(window.Sierra.ComponentManager.components);
        window.Sierra.body.html(Sierra.Component.Parse(window.Sierra.body.html()));
        $(Sierra).trigger('loaded');
        console.log('Loaded.');
    }
};

Sierra.LoginSuccess = () =>
{
    firebase.database().ref('userlist/' + firebase.auth().currentUser.uid).once('value').then( (data) =>
    {
        let username = data.val();
        firebase.database().ref('users/' + username).once('value').then( (data) =>
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