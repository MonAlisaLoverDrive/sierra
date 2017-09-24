Sierra.Component = {};
Sierra.ComponentManager = {components: []};
Sierra.ComponentManager.pages = {};

Sierra.Component.Parse = function (html)
{
    for (let i = 0; i < Sierra.ComponentManager.components.length; i++)
    {
        let component = Sierra.ComponentManager.components[i];
        if (html.toLowerCase().indexOf('<' + component.selector.toLowerCase() + '>') !== -1)
            html = html.replace(new RegExp('<' + component.selector + '>(.*?)<\/' + component.selector.toLowerCase() + '>', 'ig'), component.ToHTML());
    }
    html = html.replace(/{{([\s\S]*?)}}/g, (str, result) =>
    {
        let evalResult = eval(result);
        return (evalResult !== undefined) ? evalResult : '';
    });
    return html;
};

Sierra.Component.ToHTML = function ()
{
    return window.Sierra.Component.Parse(this.template);
};

Sierra.Component.Create = (selector, templateURL = undefined, styleURL = undefined) =>
{
    if(Sierra.ComponentManager.components.loaded === undefined)
        Sierra.ComponentManager.components.loaded = 0;

    selector = selector.toLowerCase();
    let component = {selector: selector};
    component.__proto__ = window.Sierra.Component;
    if (templateURL !== undefined)
    {
        Sierra.readFile(templateURL).then((data) =>
        {
            component.template = data;
            Sierra.ComponentManager.components[component.selector] = component;
            Sierra.ComponentManager.components.loaded++;

            if (Sierra.ComponentManager.components.loaded === Sierra.ComponentManager.components.length)
                Sierra.Load();
        })
    }
    else
    {
        Sierra.ComponentManager.components.loaded++;
    }

    Sierra.ComponentManager.components.push(component);
    Sierra.ComponentManager.components[component.selector] = component;


    if (styleURL !== undefined)
        $('head').append('<link rel="stylesheet" href="' + styleURL + '">');
    else
        $('head').append(selector.style);

    return component;
};