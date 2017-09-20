window.onresize = function (event)
{
    $('.TextByWidth').each(function()
    {
        if ($(this).attr('ratio') === undefined)
        {
            $(this).attr('ratio', 16 / $(this).width());
        }
        let parentWidth = $(this).parent().width();

        let newSize = Math.round(parentWidth * $(this).attr('ratio')) + 'px';

        if ($(this).css('font-size') !== newSize)
        {
            $(this).css('font-size', newSize);
        }
    });

    $('.HiddenUp').each(function()
    {
        $(this).css('margin-top', -$(this).height()+'px');
    });
};