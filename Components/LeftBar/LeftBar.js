window.Sierra.Component.Create('LeftBar', 'Components/LeftBar/LeftBar.html', 'Components/LeftBar/LeftBar.css');

$(Sierra).on('loaded', () =>
{
    firebase.database().ref('users/' + Sierra.user.username + '/private_data/notifications').on('value', (data) =>
    {
        console.log(data.val());
    });
});