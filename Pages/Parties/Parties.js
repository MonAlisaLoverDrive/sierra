(() =>
{
    let Parties = Sierra.Component.Create('Parties', 'Pages/Parties/Parties.html', 'Pages/Parties/Parties.css');

    Parties.OnLoad = () =>
    {

    };

    Sierra.ComponentManager.pages.parties = Parties;
})();

