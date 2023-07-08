import LiftButton from "./LiftButton.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import "../styles/Floors.css";
import { useWebSocketContext } from "../hooks/useWebSocketContext.ts";
import { UNPARSABLE_JSON_OBJECT } from "react-use-websocket/dist/lib/constants";
import { FromServerType } from "./WebSocketFunctions.ts";
import { useFloors } from "../hooks/useFloors.ts";

type ReceiveJsonMessage = {
  type: FromServerType;
  data: number | number[];
};

export default function Floors({ length = 10 }) {
  const [remove, setRemove] = useState(false);

  // TODO remove eslint-disable

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocketContext();

  const {
    selected,
    averageTime,
    setAverageTimeFunction,
    handleClickButton,
    resetPub,
    resetSub,
    addToSelectedButtonsSub,
    removeFromSelectedButtonsSub,
    currentFloor,
    setCurrentFloorFunction,
    // TODO remove eslint-disable
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  } = useFloors(sendJsonMessage);

  const floorsList = Array.from({ length: length }, (_, k) => k + 1);

  const buttons = floorsList.map((floor) => (
    <LiftButton
      key={floor}
      handleClick={() => handleClickButton(floor, remove)}
      selected={selected.has(floor)}
      floorNum={floor}
    />
  ));

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage != UNPARSABLE_JSON_OBJECT) {
      console.log("lastJsonMessage", lastJsonMessage);
      const { type, data } = lastJsonMessage as ReceiveJsonMessage;
      switch (type) {
        case FromServerType.AddFloor:
          addToSelectedButtonsSub(data as number);
          console.log("selected button", data);
          break;
        case FromServerType.RemoveFloor:
          removeFromSelectedButtonsSub(data as number);
          break;
        case FromServerType.ResetFloors:
          resetSub();
          break;
        case FromServerType.UpdateCurrentFloor:
          setCurrentFloorFunction(data as number);
          break;
        case FromServerType.UpdateAverageTime:
          setAverageTimeFunction(data as number);
          break;
        case FromServerType.UpdateLiftRequests:
          // TODO
          break;

        default:
          console.log("unknown type", type);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  return (
    <>
      <h1>Lift App test</h1>
      <p>
        <Link to="/">Go back to main page</Link>
      </p>
      <button onClick={resetPub}>Reset lift queue</button>

      <br />

      <FormControlLabel
        value="top"
        control={<Checkbox onChange={() => setRemove((remove) => !remove)} />}
        label="Select this checkbox to remove floors instead"
        labelPlacement="end"
      />

      <p>Click the buttons to add to the queue</p>

      {readyState !== WebSocket.OPEN ? (
        <>
          <h2> Unable to connect to server! </h2>
        </>
      ) : (
        <>
          <p>Current Floor: {currentFloor} </p>
          <p>
            Average time per request:{" "}
            {averageTime === 0 ? "No times logged" : averageTime}
          </p>
          <ul className="list-up">{buttons}</ul>
        </>
      )}
    </>
  );
}
