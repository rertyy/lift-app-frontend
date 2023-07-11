# lift-app-frontend

Frontend [at this link](https://github.com/rertyy/lift-app-frontend/) <br>
Backend [at this link](https://github.com/rertyy/lift-app-backend/)

Readme and more features to come (will be done when it's done)


Simple lift simulator using React, Node and Web Sockets, and written in TypeScript

Any interactions done in the frontend is broadcast to the server which then broadcasts the changes back to all clients. This allows a single-source-of-truth.
The requested floors are held in an Ordered Set (from library ``js-sdsl``) which allows stream insertion and deletion in sorted order in log(n) time.

The lift moves by a simple algorithm: it prioritises the direction it is moving in until there are no more requests in that direction. Then it switches direction. If there are no requests at all, just stop.


**Current Features:**
* Add and remove floors from lift queue
* Show current floor the lift is on
* Sync between multiple connected instances of frontend (by virtue of it being Web Sockets)
<br><br>

**To be added:**
* Formatting (to learn css!!!)
* A visualiser for the current floor, whether doors are open, etc by css. 
* Blocking to increase the time spent on floors with requests
* Requests have a starting and ending floor
* Average time per request
* Allow syncing for latecomers
<br><br>
 
**Libraries/Frameworks Used**
* [react-use-websocket](https://www.npmjs.com/package/react-use-websocket)
* [ws](https://www.npmjs.com/package/ws)
* [js-sdsl](https://www.npmjs.com/package/js-sdsl)
* Web Sockets were tested using [Web Socket Client](https://chrome.google.com/webstore/detail/web-socket-client/lifhekgaodigcpmnakfhaaaboididbdn)
<br><br>

**Notes/Reflections**<br>
Web Sockets allows duplex communication from both server and client, which is useful since the server needed to keep updating the current floor.
Web Sockets also allows communication between multiple clients, which allows multiple instances of the same page to see the same content. (Which is nice since everyone needs to see where the lift is at anyway.)

Web Sockets send Messages which needed to be sent as ``JSON.stringify()`` and received as ``JSON.parsed()``. ``react-use-websocket`` provides ``sendJsonMessage`` and ``lastJsonMessage`` to minimise the use of converting back and forth between strings, but this still has to be done via a function with ``ws``.

It is kind of similar to serialising and de-serialising between JSON and the structure for respective languages (data classes for Kotlin, struct for Go, etc). Full-stack JS is nice in that de/serialisation is relatively painless between json and JS objects.

I did not use Socket.IO in case I wanted to use another language for my backend (Socket.IO apparently abstracts too many details?), and Web Sockets is natively supported by most browsers now.

**Possible Extensions**<br>
* Concurrency. Web Sockets allows multiple messages to be sent at once from multiple clients, and this might cause issues because my current implementation of the backend and the library implementation of the data structure (backed by a red-black tree) don't lend itself well to concurrency. Perhaps another framework (use Ktor with ConcurrentSkipListSet? I hear Go is good too.).
* Maybe Blender/Three.JS for more visualisation of the current floor.
