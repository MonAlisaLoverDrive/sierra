var QuickEvent = function () {
    var nextSubscriberId = 0;
    var subscriberList = [];

    var subscribe = function (callback) {
        var id = nextSubscriberId;
        subscriberList[id] = callback;
        nextSubscriberId++;
        return id;
    };

    var unsubscribe = function (id) {
        delete subscriberList[id];
    };

    var trigger = function (sender) {
        for (var i in subscriberList) {
            subscriberList[i].apply(sender, Array.prototype.slice.call(arguments, 1));
        }
    };

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        trigger: trigger
    };
};