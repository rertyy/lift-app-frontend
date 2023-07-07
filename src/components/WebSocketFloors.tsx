import useWebSocket, { ReadyState } from "react-use-websocket";
import { JsonValue, SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { createContext } from "react";
import Floors from "./Floors.tsx";

export type WebSocketData = {
  sendJsonMessage: SendJsonMessage;
  lastJsonMessage: JsonValue | null;
  readyState: ReadyState;
};

export const WebSocketContext = createContext<WebSocketData | undefined>(
  undefined,
);

const WebSockFloors = () => {
  const socketUrl = "ws://localhost:3000";
  const options = {
    shouldReconnect: () => true,
    retryOnError: true,
  };
  const { sendJsonMessage, lastJsonMessage, readyState }: WebSocketData =
    useWebSocket(socketUrl, options);

  const webSocketData: WebSocketData = {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  };

  return (
    <>
      <WebSocketContext.Provider value={webSocketData}>
        <Floors />
        {/*<button onClick={() => addFloor(sendMessage, 1)}>Add Floor</button>*/}
        {/*<button onClick={() => removeFloor(sendMessage, 1)}>Remove Floor</button>*/}
      </WebSocketContext.Provider>
      <div>WebSocket Status: {readyState}</div>
      {lastJsonMessage && (
        <div>Last Message From Server: {JSON.stringify(lastJsonMessage)}</div>
      )}
    </>
  );
};

export default WebSockFloors;
