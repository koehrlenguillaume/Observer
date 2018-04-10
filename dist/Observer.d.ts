export interface IObserver {
    ReceiveNotification(message: any): void;
}
export interface IObservable {
    RegisterObserver(key: string, Observer: IObserver): void;
    RemoveObserver(key: string, Observer: IObserver): void;
    NotifyObservers(key: string, message: any): void;
}
export declare class Observer implements IObservable {
    private _observers;
    constructor();
    private _getObserverItem(key);
    /**
     * Register a observer to a specific key. This observer will be notified when data are goint to be send to the key
     * @param key
     * @param theObserver
     */
    RegisterObserver(key: string, theObserver: IObserver): void;
    /**
     * Remove the observer from the key
     * @param key
     * @param theObserver
     */
    RemoveObserver(key: string, theObserver: IObserver): void;
    /**
     * Function to notify all the observers class binded to a specific key
     * @param key --> key to send the data
     * @param message --> data send to observers binded to the first parameter key
     */
    NotifyObservers(key: string, message: any): void;
    /**
     * Return the current instance of the global observer instance
     */
    static GetGlobalInstance(): IObservable;
}
