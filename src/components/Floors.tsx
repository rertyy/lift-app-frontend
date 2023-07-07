import LiftButton from "./LiftButton.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import "../styles/Floors.css";
import { RequestType, sendToServer } from "./WebSocketFunctions.tsx";

import { useWebSocketContext } from "./UseWebSocketContext.tsx";

type ReceiveJsonMessage = {
  type: RequestType;
  data: number | number[];
};

export default function Floors({ length = 10 }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [averageTime, setAverageTime] = useState(0);
  // const [lastPressed, setLastPressed] = useState<number | null>(null);
  const [remove, setRemove] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);

  function handleClick(floorNum: number) {
    console.log(`You clicked floor ${floorNum}`);
    if (remove) {
      sendToServer(sendJsonMessage, RequestType.RemoveFloor, floorNum);
      // setRemaining((remaining) =>
      //   remaining.filter((floor) => floor !== floorNum),
      // );
    } else {
      sendToServer(sendJsonMessage, RequestType.AddFloor, floorNum);
      // setRemaining((remaining) => [...remaining, floorNum]);
    }
  }

  function reset() {
    sendToServer(sendJsonMessage, RequestType.ResetFloors, 0);
    // TODO reset all floors via broadcast
    console.log("reset");
    // setLastPressed(null);
  }

  function addToSelectedButtons(num: number) {
    setSelected((selected) => {
      selected.add(num);
      console.log(selected);
      return selected;
    });
  }

  function removeFromSelectedButtons(num: number) {
    setSelected((selected) => {
      selected.delete(num);
      console.log(selected);
      return selected;
    });
  }

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocketContext();

  const floorsList = Array.from({ length: length }, (_, k) => k + 1);

  const buttons = floorsList.map((floor) => (
    <LiftButton
      key={floor}
      handleClick={handleClick}
      selected={selected.has(floor)}
      floorNum={floor}
    />
  ));

  useEffect(() => {
    if (lastJsonMessage) {
      console.log("lastJsonMessage", lastJsonMessage);
      const { type, data } = lastJsonMessage as ReceiveJsonMessage;
      switch (type) {
        case RequestType.UpdateLiftRequests:
          // TODO
          break;
        case RequestType.UpdateCurrentFloor:
          setCurrentFloor(data as number);
          break;
        case RequestType.UpdateAverageTime:
          setAverageTime(data as number);
          break;
        case RequestType.SelectButton:
          addToSelectedButtons(data as number);
          console.log("selected", data);
          break;
        case RequestType.DeselectButton:
          removeFromSelectedButtons(data as number);
          break;
        default:
          console.log("unknown type", type);
      }
    }
  }, [lastJsonMessage]);

  return (
    <>
      <h1>Lift App test</h1>
      <p>
        <Link to="/">Go back to main page</Link>
      </p>
      <button onClick={reset}>Reset lift queue</button>

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
        </>
      )}
      <ul className="list-up">{buttons}</ul>
    </>
  );
}
