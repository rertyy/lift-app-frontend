/*
import LiftButton from "./LiftButton.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import "../styles/Floors.css";

export default function Floors({ length = 10 }) {
  function handleClick(floorNum: number) {
    console.log(`You clicked floor ${floorNum}`);

    if (remove) {
      setRemaining((remaining) =>
        remaining.filter((floor) => floor !== floorNum),
      );
    } else {
      setRemaining((remaining) => [...remaining, floorNum]);
    }
  }

  function reset() {
    console.log("reset");
    setRemaining([]);
    setLastPressed(null);
  }

  const floorsList = Array.from({ length: length }, (_, k) => k + 1);
  const buttons = floorsList.map((floor) => (
    <LiftButton key={floor} handleClick={handleClick} floorNum={floor} />
  ));

  const [remaining, setRemaining] = useState<number[]>([]);
  const [lastPressed, setLastPressed] = useState<number | null>(null);
  const [remove, setRemove] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  useEffect(() => {
    if (remaining.length > 0) {
      const last = remaining[remaining.length - 1];
      setLastPressed(last);
    } else {
      setLastPressed(null);
    }
  }, [remaining]);

  useEffect(() => {
    // TODO redo this
    if (remaining.length > 50) {
      setCurrentFloor(50);
    }
  }, [remaining]);

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

      {remaining.length === 0 ? (
        <>
          <h2> Press a button to start! </h2>
        </>
      ) : (
        <>
          <p>Current Floor: {currentFloor} </p>
          <h2>Last Pressed: {lastPressed}</h2>
          <h2>Currently Pressed: {remaining.join(", ")}</h2>
        </>
      )}
      <ul className="list-up">{buttons}</ul>
    </>
  );
}
*/
