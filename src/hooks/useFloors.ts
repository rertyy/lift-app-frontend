import { useState } from "react";
import { sendToServer } from "../components/WebSocketFunctions.ts";
import { ToServerType } from "../components/WebSocketFunctions.ts";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export function useFloors(sendJsonMessage: SendJsonMessage) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [averageTime, setAverageTime] = useState<number>(0);
  const [currentFloor, setCurrentFloor] = useState<number>(1);

  function handleClickButton(floorNum: number, remove = true) {
    console.log(`You clicked floor ${floorNum}`);
    if (remove) {
      sendToServer(sendJsonMessage, ToServerType.RemoveFloor, floorNum);
    } else {
      sendToServer(sendJsonMessage, ToServerType.AddFloor, floorNum);
    }
  }

  function setAverageTimeFunction(num: number) {
    setAverageTime(num);
  }

  function setCurrentFloorFunction(num: number) {
    console.log(`current floor: ${num}`);
    setCurrentFloor(num);
  }

  function resetPub() {
    sendToServer(sendJsonMessage, ToServerType.ResetFloors, 0);
    console.log("reset");
  }

  function resetSub() {
    setSelected(new Set());
    setAverageTime(0);
  }

  function addToSelectedButtonsSub(num: number) {
    setSelected((prevSelected) => new Set(prevSelected).add(num));
    console.log(`select: ${selected[Symbol.toStringTag]}`);
  }

  function removeFromSelectedButtonsSub(num: number) {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(num);
      return newSelected;
    });
    console.log(`deselect: ${selected[Symbol.toStringTag]}`);
  }

  return {
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
  };
}
