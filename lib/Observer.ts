declare var window: any;

export interface IObserver {
    ReceiveNotification(message: any): void;
}

export interface IObservable {
    RegisterObserver(key : string, Observer: IObserver): void;
    RemoveObserver(key: string, Observer: IObserver): void;
    NotifyObservers(key: string, message: any): void;
}

interface IObserverItem {
    key: string;
    observers: IObserver[];
}

class ObserverItem implements IObserverItem {
    key: string;
    observers: IObserver[];

    constructor(key: string, observers: IObserver[]) {
        this.key = key;
        this.observers = observers;
    }
}

export class Observer implements IObservable {
    private _observers: IObserverItem[];

    constructor() {
        this._observers = [];
    }

    private _getObserverItem(key: string): any
    {
        let items: IObserverItem[] = this._observers.filter( (currentItem) => currentItem.key === key );
        return (items.length > 0) ? items[0] : undefined;
    }

    /**
     * Register a observer to a specific key. This observer will be notified when data are goint to be send to the key
     * @param key 
     * @param theObserver 
     */
    public RegisterObserver(key: string, theObserver: IObserver): void 
    {
        let correspondingObserver = this._getObserverItem(key);
        if(correspondingObserver !== undefined){
            correspondingObserver.observers.push(theObserver);
        }
        else {
            this._observers.push(new ObserverItem(key, [theObserver])); 
        }
    }

    /**
     * Remove the observer from the key
     * @param key 
     * @param theObserver 
     */
    public RemoveObserver(key: string, theObserver: IObserver): void 
    {
        let correspondingObserver = this._getObserverItem(key);
        if(correspondingObserver !== undefined)
        {
            for (let i = 0; i < correspondingObserver.observers.length; i++) 
            {
                let currentObserver = correspondingObserver.observers[i];
                if (currentObserver === theObserver) {
                    correspondingObserver.observers.splice(i,1);
                }
            }
        }
    }

    /**
     * Function to notify all the observers class binded to a specific key
     * @param key --> key to send the data
     * @param message --> data send to observers binded to the first parameter key
     */
    public NotifyObservers(key: string, message: any) 
    {
        let correspondingObserver = this._getObserverItem(key);
        if(correspondingObserver !== undefined)
        {
            for (let i = 0; i < correspondingObserver.observers.length; i++) 
            {
                correspondingObserver.observers[i].ReceiveNotification(message);
            }
        }
    }

    /**
     * Return the current instance of the global observer instance
     */
    public static GetGlobalInstance(): IObservable {
        if (window.Observer === undefined)
            window.Observer = new Observer();
        
        return window.Observer;
    }
}