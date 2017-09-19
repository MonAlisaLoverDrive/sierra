window.Sierra.Component = {};

window.Sierra.ComponentManager = {components: []};

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
    let component = {selector: selector};
    component.__proto__ = window.Sierra.Component;
    if (templateURL !== undefined)
    {
        Sierra.readFile(templateURL).then((data) =>
        {
            component.template = data;
            Sierra.ComponentManager.components.push(component);
        })
    }
    else
        Sierra.ComponentManager.components.push(component);

    if (styleURL !== undefined)
        NW.Dom.first('head').innerHTML += '<link rel="stylesheet" href="' + styleURL + '">';
    else
        NW.Dom.first('head').innerHTML += selector.style;
};