import useWebSocket, { ReadyState } from "react-use-websocket";
import { JsonValue, SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { createContext } from "react";
import Floors from "./Floors.tsx";
import { ServerState } from "./ServerState.tsx";

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
        <ServerState />
      </WebSocketContext.Provider>
    </>
  );
};

export default WebSockFloors;
