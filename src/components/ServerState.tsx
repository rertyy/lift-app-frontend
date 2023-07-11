import {
  ReadyState,
  UNPARSABLE_JSON_OBJECT,
} from "react-use-websocket/dist/lib/constants";
import { useWebSocketContext } from "../hooks/useWebSocketContext.ts";

export function ServerState() {
  // TODO error handling
  const { lastJsonMessage, readyState } = useWebSocketContext();

  switch (readyState) {
    case ReadyState.CONNECTING:
      return (
        <>
          <div>Connecting to server...</div>
        </>
      );
    case ReadyState.OPEN:
      return (
        <>
          ReadyState: {readyState}
          <div>Connected to server</div>
          {lastJsonMessage === UNPARSABLE_JSON_OBJECT ? (
            <div>Last Message: unable to parse last message </div>
          ) : (
            <div>Last Message: {JSON.stringify(lastJsonMessage)}</div>
          )}
        </>
      );

    case ReadyState.CLOSED:
      return <div>Connection closed</div>;
  }
}
