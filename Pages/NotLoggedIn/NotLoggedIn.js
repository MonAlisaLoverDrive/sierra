(() =>
{
    let NotLoggedIn = Sierra.Component.Create('NotLoggedIn', 'Pages/NotLoggedIn/NotLoggedIn.html', 'Pages/NotLoggedIn/NotLoggedIn.css');

    NotLoggedIn.SwitchToSignIn = () =>
    {
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.animate({
            'margin-top': -$signUp.height() + 'px',
            'opacity': 0
        }, 1000, ()=>{$signUp.addClass('HiddenUp')});
        $signUp.css('pointer-events', 'none');

        $("div.NotLoggedIn #SwitchToSignUp").fadeIn(500);
        $("div.NotLoggedIn #SwitchToSignIn").fadeOut(500);
    };

    NotLoggedIn.SwitchToSignUp = () =>
    {
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.animate({
            'margin-top': 0,
            'opacity': 1
        }, 1000, ()=>{$signUp.removeClass('HiddenUp')});
        $signUp.css('pointer-events', 'auto');

        $("div.NotLoggedIn #SwitchToSignIn").fadeIn(500);
        $("div.NotLoggedIn #SwitchToSignUp").fadeOut(500);
    };

    Sierra.ComponentManager.pages.NotLoggedIn = NotLoggedIn;
})();

