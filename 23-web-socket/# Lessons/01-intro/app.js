/*
  What are websockets?
  - Websockets are a communication protocol that provides a full-duplex communication channels over a single, long-held TCP connection.


****************************

  1. Establishing the connection:

  - To establish a websocket connection, a handshake between the client and server happens.
  - This handshake is initiated by the client and includes a special kind of HTTP header  called and ' Upgrade' header
  - Which signifies that client wants to establish a websocket connection

  2. Upgrading to WebSocket Protocol:

  - If the server supports the websocket connection then it replies with 'Upgrade' header in its response which signifies and confirms that the connection is switched from HTTP to websocket

  3. Persistent, two way communication:

  - Once the handshake is complete the connection is switched from HTTP to websocket connection.

  - which is a persistent two way communication channel where each party in the connection that is the client as well as the server can send data to each other any time


****************************

  HTTP req-res Model vs Websockets
  # HTTP unique features

  1.Stateless Protocol

  - HTTP is a stateless protocol, what it means is that it operates in a request response model

  - Each request from the client requires a separate HTTP request and the server responses to that request and the connection is closed

  - for example: client request data to load a page, server response with the data and the connection is closed

  2. One way Communication:

  - In HTTP the connection is unidirectional, client sends a request and the server receives the request then responses to that request. This makes it less efficient in use cases where there is need for continuous exchange of data

  3. Overhead

  - Each HTTP request contains headers and other meta data which makes a HTTP request heavy as compared to a websocket connection


  # WebSocket unique features

  1. Full-Duplex communication

  - Websockets allow for full duplex communication, which means that the data can go through any direction that allows for real time interaction

  2. Reduced Overhead

  - Websockets do not contain additional meta data like HTTP headers which reduces data overload and improves performance especially over slow networks and allows for smooth flow of data

  3. Stateful Protocol

  - Unlike HTTP, the websocket protocol is stateful, which means the server and client knows that they are connected to each other and the connection remains open until it is closed


****************************

  Real World Advantages and use-cases of Websockets
  - Here are some of the real world applications and advantages of WebSockets.

    + Chat Application: Real time chat app can be easily created using websockets
    + Gaming: Online gaming where fast bi directional data transfer is required to play games. Especially fast paced games
    + Financial trading platforms: Financial trading platforms where real time fast data transfers is required such as stock prices and fat execution of trades
    + Live Sports Updates: Sporting events are good and drives real time data transfer is neessory for the viewer to be engaged in sports
    + Collaboration Tools: Real time collaboration tools such as whiteboard and document sharing require websockets to function
    + Notification Services: Instant notification and alerts can be made using websockets

  - Advantages
    + Real Time interaction
    + Efficient Performance
    + Scalability
    + Flexibility


****************************

  What is Node Js and why NodeJs is the recommended platform for using WebSockets?
  - Node JS is an open source cross platform JavaScript runtime environment, using which you can run JavaScript on the server side.

  - Node JS is built on the V8 runtime environment of Chrome that allows developers to use JavaScript outiside the browser

  1. JavaScript everywhere: NodeJS  extends javascript to the server as well. Before javascript was only used inside the browser
  2. Event-Driven architecture: Node JS has an event driven architecture and non blocking I/O based model that makes it lightweight for your applications
  3. NPM Node Version Manager: Node Js comes with an enormous library of packages that are managed through NPM. NPM makes it easy to incorporate various tools and packages into your application
  4. Async and Non Blocking: Node JS is Async and non blocking by nature, which means it can continue to process other requests while waiting for the completion of tasks like reading a file etc
  5. Scalable: Node Js has a lightweight architecture and can scale to thousands of connections


  # Why Node Js is preferred to be used with WebSockets
    + Handling concurrent connections
    + Real Time performance
    + Unified Javascript Development
    + Vast Ecosystem and Community Support
    + Efficient handling of Binary Data
    + Easy integration with Web technologies


****************************

  Step By Step Tutorial: Building a Real time chat app
  - In this section we are going to build a real time chat application in a step by step format

  - Environment setup:
    + Creating the server with NodeJs and WebSockets
    + Creating the client
    + Handling client server communication
    + Running the app
    + Optional Enhancing the Application
    + User Auth
    + Storing messages
    + Adding rooms and channels
    + UI improvements


*/
