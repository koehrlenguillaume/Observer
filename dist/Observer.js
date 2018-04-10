"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObserverItem = /** @class */ (function () {
    function ObserverItem(key, observers) {
        this.key = key;
        this.observers = observers;
    }
    return ObserverItem;
}());
var Observer = /** @class */ (function () {
    function Observer() {
        this._observers = [];
    }
    Observer.prototype._getObserverItem = function (key) {
        var items = this._observers.filter(function (currentItem) { return currentItem.key === key; });
        return (items.length > 0) ? items[0] : undefined;
    };
    /**
     * Register a observer to a specific key. This observer will be notified when data are goint to be send to the key
     * @param key
     * @param theObserver
     */
    Observer.prototype.RegisterObserver = function (key, theObserver) {
        var correspondingObserver = this._getObserverItem(key);
        if (correspondingObserver !== undefined) {
            correspondingObserver.observers.push(theObserver);
        }
        else {
            this._observers.push(new ObserverItem(key, [theObserver]));
        }
    };
    /**
     * Remove the observer from the key
     * @param key
     * @param theObserver
     */
    Observer.prototype.RemoveObserver = function (key, theObserver) {
        var correspondingObserver = this._getObserverItem(key);
        if (correspondingObserver !== undefined) {
            for (var i = 0; i < correspondingObserver.observers.length; i++) {
                var currentObserver = correspondingObserver.observers[i];
                if (currentObserver === theObserver) {
                    correspondingObserver.observers.splice(i, 1);
                }
            }
        }
    };
    /**
     * Function to notify all the observers class binded to a specific key
     * @param key --> key to send the data
     * @param message --> data send to observers binded to the first parameter key
     */
    Observer.prototype.NotifyObservers = function (key, message) {
        var correspondingObserver = this._getObserverItem(key);
        if (correspondingObserver !== undefined) {
            for (var i = 0; i < correspondingObserver.observers.length; i++) {
                correspondingObserver.observers[i].ReceiveNotification(message);
            }
        }
    };
    /**
     * Return the current instance of the global observer instance
     */
    Observer.GetGlobalInstance = function () {
        if (window.Observer === undefined)
            window.Observer = new Observer();
        return window.Observer;
    };
    return Observer;
}());
exports.Observer = Observer;
