Lang = {data:{}};

Lang.Motd = () =>
{
    return Lang.data.motd_list[Math.round(Math.random()*(Lang.data.motd_list.length-1))];
};

Lang.Random = (property) =>
{
    if (property === undefined)
        return 'Invalid property.';
    else if (property.length !== undefined)
        return Lang.data[property][Math.round(Math.random()*(Lang.data[property].length-1))];
};