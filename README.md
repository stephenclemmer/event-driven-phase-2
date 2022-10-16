# event-driven-phase-2

Author: Stephen Clemmer

### Links and Resources

**UML**
![Lab 12 UML](./assets/Lab%2012%20UML.png)

**Problem Domain**
In Phase 2, we’ll be changing the underlying networking implementation of our CAPS system from using node events to using a library called Socket.io so that clients can communicate over a network. Socket.io manages the connection pool for us, making broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

#### Global Event Pool (HUB)

- The Socket Server will create a namespace of caps that will receive all CAPS event traffic.
- Each Vendor and Driver Client will connect to the caps namespace.
- The server will emit specific events to each socket that is listening for their designated events from the Global Event Pool defined in the Server.
- Each Vendor will only emit and listen for specific events based on their Vendor ID. This will be managed by rooms within Socket.io.
- Each Driver will “pick up” a package when the vendor notifies the Server that an “order” is ready and simulate “in-transit” and “delivered” events.

**The goal of this lab is to create a namespaced Socket.io event server, and to configure Vendor and Driver Client Modules.**

- Export a single EventEmitter from the Node JS module.
- Should be imported by any module that needs to notify or be alerted by other modules of an event.

**Implement a Module for Managing Global Package Events.**

- Listens to ALL events in the Event Pool.
- Logs a timestamp and the payload of every event.

#### Vendor Client Application

**Implement a Module for Managing Vendor Events.**

- Your implementation should use a store name as a parameter.
- When triggered, the vendor module simulates a pickup event for the given store name to the Global Event Pool:
- emits pickup to the global event pool.
- sends a vendor order payload

#### Driver Client Application

**Implement a Module for Managing Driver Events.**

- Listens for a pickup event from the Global Event Pool and responds with the following:
- Log a message to the console: DRIVER: picked up ORDER_ID.
- Emit an in-transit event to the Global Event Pool with the order payload.
- Log a confirmation message to the console: DRIVER: delievered ORDER_ID.
- Emit a delivered event to the Global Event Pool with the order payload.

**Tests**
NA

**File Structure**

├── .gihthub/worklflows
│   ├── javascript-tests.yml
├── config
│   ├── config.json
├── nodemodules
├── src
│   ├── driver
│   │   ├── deliverOrder.js
│   │   ├── index.js
│   │   ├── transitOrder.js
│   ├── vendor
│   │   ├── index.js
├── editorconfig
├── .eslintignore
├── .eslintrc.json
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .eslintrc.json
├── config.json
├── index.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md

### Features

The following user/developer stories detail the major functionality for this phase of the project.

As a vendor, I want to alert the system when I have a package to be picked up.
As a driver, I want to be notified when there is a package to be delivered.
As a driver, I want to alert the system when I have picked up a package and it is in transit.
As a driver, I want to alert the system when a package has been delivered.
As a vendor, I want to be notified when my package has been delivered.
And as developers, here are some of the development stories that are relevant to the above.

As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications
