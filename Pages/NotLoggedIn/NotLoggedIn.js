(() =>
{
    let NotLoggedIn = Sierra.Component.Create('NotLoggedIn', 'Pages/NotLoggedIn/NotLoggedIn.html', 'Pages/NotLoggedIn/NotLoggedIn.css');
    let signinUp = true;

    NotLoggedIn.SwitchToSignIn = () =>
    {
        console.log(1);
        signinUp = false;
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.css('margin-bottom', -$signUp.height() + 'px');
        $signUp.addClass('HiddenDown');
        $signUp.css('pointer-events', 'none');

        $("div.NotLoggedIn .SignIn").removeClass('Hidden');
        $("div.NotLoggedIn #SwitchToSignIn").addClass('Hidden');
    };

    NotLoggedIn.SwitchToSignUp = () =>
    {
        console.log(2);
        signinUp = true;
        let $signUp = $('div.NotLoggedIn div.SignUp');
        $signUp.css('margin-bottom', 0);
        $signUp.removeClass('HiddenDown');
        $signUp.css('pointer-events', 'auto');

        $("div.NotLoggedIn #SwitchToSignIn").removeClass('Hidden');
        $("div.NotLoggedIn .SignIn").addClass('Hidden');
    };


    NotLoggedIn.Continue = () =>
    {
        let $email = $('div.NotLoggedIn #Email');
        let $password = $('div.NotLoggedIn #Password');
        let $name = $('div.NotLoggedIn #Name');
        let $username = $('div.NotLoggedIn #Username');

        let $this = $('div.NotLoggedIn #Continue');

        $this.addClass('Loading');

        if (signinUp)
        {
            if ($name.val() === '')
            {
                $('div.NotLoggedIn #NameLabel').addClass('Alert');
                $name.addClass('Alert');
                $this.removeClass('Loading');
            }
            if ($password.val() === '')
            {
                $('div.NotLoggedIn #PasswordLabel').addClass('Alert');
                $password.addClass('Alert');
                $this.removeClass('Loading');
            }
            if ($username.val() === '')
            {
                $('div.NotLoggedIn #UsernameLabel').addClass('Alert');
                $username.addClass('Alert');
                $this.removeClass('Loading');
            }
            firebase.auth().createUserWithEmailAndPassword($email.val(), $password.val()).then(() =>
            {
                Sierra.SignUpSuccess({name: $name.val(), username: $username.val(), email: $email.val()});
            }).catch((error) =>
            {
                $('div.NotLoggedIn #EmailLabel').addClass('Alert');
                $email.addClass('Alert');
                $this.removeClass('Loading');
            });
        }
        else
        {
            if ($password.val() === '')
            {
                $('div.NotLoggedIn #PasswordLabel').addClass('Alert');
                $password.addClass('Alert');
                $this.removeClass('Loading');
            }

            firebase.auth().signInWithEmailAndPassword($email.val(), $password.val()).then(() =>
            {
                Sierra.LoginSuccess();
            });
        }
    };

    NotLoggedIn.OnLoad = () =>
    {
        $("div.NotLoggedIn .SignIn").addClass('Hidden');

        $("div.NotLoggedIn").on('focus click', '.Alert', function ()
        {
            $('div.NotLoggedIn .Alert').removeClass('Alert');
        });

        $("div.NotLoggedIn #Username").alphanum({
            allowSpace: false,
            allowNewline: false,
            allowOtherCharSets: false,
            allow: '_-'
        });

        $('div.NotLoggedIn div.Eye').click(() =>
        {
            if ($('div.NotLoggedIn #Password').attr('type') === 'text')
            {
                $('div.NotLoggedIn #Password').attr('type', 'password');
                $('div.NotLoggedIn div.Eye').removeClass('Active');
            }
            else
            {
                $('div.NotLoggedIn #Password').attr('type', 'text');
                $('div.NotLoggedIn div.Eye').addClass('Active');
            }
        });
    };

    Sierra.ComponentManager.pages.notloggedin = NotLoggedIn;
})();

