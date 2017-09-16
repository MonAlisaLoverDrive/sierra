window.Sierra.Component = {};

window.Sierra.ComponentManager = {components:[]};

Sierra.Component.Parse = function (html)
{
    for (let i = 0; i < Sierra.ComponentManager.components.length; i++)
    {
        let component = Sierra.ComponentManager.components[i];
        if (html.toLowerCase().indexOf('<' + component.selector.toLowerCase() + '>') !== -1)
            html = html.replace(new RegExp('<' + component.selector + '>(.*?)<\/' + component.selector.toLowerCase() + '>', 'ig'), component.ToHTML());
    }
    html = html.replace(/{{(.*?)}}/g, (str, result) =>
        {
            return eval(result);
});
    return html;
};

Sierra.Component.ToHTML = function ()
{
    return window.Sierra.Component.Parse(this.template);
};

Sierra.Component.Create = (selector, templateURL = undefined, styleURL = undefined) =>
{
    let component = {selector: selector};
    component.__proto__ = window.Sierra.Component;
    if (templateURL !== undefined)
    {
        $.get(templateURL, (data) =>
        {
            component.template = data;
        Sierra.ComponentManager.components.push(component);
    });
    }
    else
        Sierra.ComponentManager.components.push(component);

    if (styleURL !== undefined)
        $('head').append('<link rel="stylesheet" href="' + styleURL + '">');
    else
        $('head').append(selector.style);
};