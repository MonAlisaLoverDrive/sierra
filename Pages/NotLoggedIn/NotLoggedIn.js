(() =>
{
    let NotLoggedIn = Sierra.Component.Create('NotLoggedIn', 'Pages/NotLoggedIn/NotLoggedIn.html', 'Pages/NotLoggedIn/NotLoggedIn.css');

    NotLoggedIn.SwitchToSignIn = () =>
    {
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.css('margin-bottom', -$signUp.height() + 'px');
        $signUp.addClass('HiddenDown');
        $signUp.css('pointer-events', 'none');

        $("div.NotLoggedIn #SwitchToSignUp").fadeIn(500);
        $("div.NotLoggedIn #SwitchToSignIn").fadeOut(500);
    };

    NotLoggedIn.SwitchToSignUp = () =>
    {
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.css('margin-bottom', 0);
        $signUp.removeClass('HiddenDown');
        $signUp.css('pointer-events', 'auto');

        $("div.NotLoggedIn #SwitchToSignIn").fadeIn(500);
        $("div.NotLoggedIn #SwitchToSignUp").fadeOut(500);
    };

    NotLoggedIn.OnLoad = () =>
    {
        $("div.NotLoggedIn #SwitchToSignUp").hide();
    };

    Sierra.ComponentManager.pages.NotLoggedIn = NotLoggedIn;
})();

