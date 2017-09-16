window.Sierra = {};
window.Sierra.loadCounter = 0;
window.Sierra.body = $('body bodycontent');

Sierra.Load = () =>
{
    Sierra.loadCounter++;
    if (Sierra.loadCounter > 0)
    {
        console.log(window.Sierra.ComponentManager.components);
        window.Sierra.body.html(Sierra.Component.Parse(window.Sierra.body.html()));
    }
};