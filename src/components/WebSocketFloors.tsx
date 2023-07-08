import useWebSocket, { ReadyState } from "react-use-websocket";
import { JsonValue, SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { createContext } from "react";
import Floors from "./Floors.tsx";
import { UNPARSABLE_JSON_OBJECT } from "react-use-websocket/dist/lib/constants";

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
  const { sendJsonMessage, lastJsonMessage, readyState }: WebSocketData =
    useWebSocket(socketUrl, {
      shouldReconnect: () => true,
      reconnectAttempts: 3,
      reconnectInterval: 3000,
      retryOnError: true,
    });

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

      {lastJsonMessage === UNPARSABLE_JSON_OBJECT && (
        <div>Last Message: unable to parse last message </div>
      )}
      {lastJsonMessage && lastJsonMessage !== UNPARSABLE_JSON_OBJECT && (
        <div>Last Message From Server: {JSON.stringify(lastJsonMessage)}</div>
      )}
    </>
  );
};

export default WebSockFloors;
