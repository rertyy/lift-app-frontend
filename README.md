# lift-app-frontend

Frontend [at this link](https://github.com/rertyy/lift-app-frontend/) <br>
Backend [at this link](https://github.com/rertyy/lift-app-backend/)

Readme and more features TBC (will be done when it's done)

Simple project done in 3-4 days using React and Node using Web Sockets, written in TypeScript.

**Current Features:**
* Add and remove floors from lift queue
* Show current floor the lift is on
* Sync between multiple pages (by virtue of it being websockets)

**To be added:**
* Formatting (to learn css!!!)
* Average time per request (to be added)

**Libraries/Frameworks Used**
* [react-use-websocket](https://www.npmjs.com/package/react-use-websocket)
* [ws](https://www.npmjs.com/package/ws)
* [js-sdsl](https://www.npmjs.com/package/js-sdsl) (for sorted map)

Web Sockets were tested using [Web Socket Client](https://chrome.google.com/webstore/detail/web-socket-client/lifhekgaodigcpmnakfhaaaboididbdn)



**Notes/Reflections**<br>
I initially wanted to use Web Sockets because it allows duplex communication from both server and client, which is useful since the server needed to keep updating the current floor.
But Web Sockets also allows communication between multiple clients, which allows multiple instances of the same page to see the same content, which is (coincidentally) is also in the spirit of letting everyone see the current state of the lift haha.

Web Sockets send Messages which needed to be sent as ``JSON.stringify()`` and recieved as ``JSON.parsed()``. react-use-websocket provides ``sendJsonMessage`` and ``lastJsonMessage`` to minimise the use of converting back and forth between strings.
Although it felt a bit of a pain at first, it still is kind of similar to serialising and deserialising between JSON and the structure for respective languages (data classes for Kotlin, struct for Go). Full-stack JS is nice in that de/serialisation is relatively painless.
I didn't use Socket.IO in case I wanted to use another language, was initiailly looking at gorilla/websockets but I didn't feel like making my own data structures in Golang.

**Extensions?**<br>
* Perhaps this can be rewritten in ktor to take advantage of Java's ConcurrentSkipListMap For the higher/ceilingkey function to find the next floor in O(1) instead of log(n)
* Maybe Blender/Three.JS 
