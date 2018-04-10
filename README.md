# react-observer-pattern
A Node.js module that implement the observer pattern in react
## Installation 
```sh
npm install react-observer-pattern --save
```
## Usage
### TypeScript
```typescript
import { Observer, IObserver } from 'react-observer-pattern';

export class test implements IObserver {

  ReceiveNotification(message: any): void {
    console.log(message);
  }

  constructor(){
    Observer.GetGlobalInstance().RegisterObserver("key", this);
  }
}
```

```typescript
Observer.GetGlobalInstance().NotifyObservers("key", "message");
```

This sample show you : 
* How to bind to a specific key
* How to send an information to a specific key
