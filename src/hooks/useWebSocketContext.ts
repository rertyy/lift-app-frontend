import { useContext } from "react";
import {
  WebSocketContext,
  WebSocketData,
} from "../components/WebSocketFloors.tsx";

export const useWebSocketContext = (): WebSocketData => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider",
    );
  }
  return context;
};
