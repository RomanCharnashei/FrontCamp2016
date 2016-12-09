export default class Mediator {
    constructor() {
        this.channels = {};
    }

    subscribe(channel, fn) {
        if (!this.channels[channel]) this.channels[channel] = [];
        this.channels[channel].push({ context: this, callback: fn });
        return this;        
    }

    publish(channel) {
        if (!this.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    }
}