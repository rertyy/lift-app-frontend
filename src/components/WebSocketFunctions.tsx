import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export enum RequestType {
  AddFloor,
  RemoveFloor,
  ResetFloors,
  UpdateCurrentFloor,
  UpdateAverageTime,
  UpdateLiftRequests,
  SelectButton,
  DeselectButton,
}

type RequestMessage = {
  type: RequestType;
  floorNum: number;
};

export function sendToServer(
  sendJsonMessage: SendJsonMessage | undefined,
  requestType: RequestType,
  floorNum: number,
) {
  if (sendJsonMessage) {
    const message: RequestMessage = {
      type: requestType,
      floorNum: floorNum,
    };
    sendJsonMessage(message);
  }
}

// export function updateRemainingFloors(
//   sendJsonMessage: SendJsonMessage | undefined,
// ) {
//   const message: Message = {
//     type: RequestType.ResetFloors,
//     floorNum: 0,
//   };
//   if (sendJsonMessage) {
//     sendJsonMessage(message);
//   }
// }
//
// export function updateCurrentFloor(
//   sendJsonMessage: SendJsonMessage | undefined,
// ) {
//   const message: Message = {
//     type: RequestType.ResetFloors,
//     floorNum: 0,
//   };
//   if (sendJsonMessage) {
//     sendJsonMessage(message);
//   }
// }

// export function handleWebSocketMessage(
//   message: WebSocketMessage,
//   setFloors: Dispatch<SetStateAction<number[]>>,
// ) {
//   const data = JSON.parse(message.data);
//   switch (data.type) {
//     case RequestType.AddFloor:
//       setFloors((floors) => [...floors, data.floorNum]);
//       break;
//     case RequestType.RemoveFloor:
//       setFloors((floors) => floors.filter((f) => f !== data.floorNum));
//       break;
//     case RequestType.ResetFloors:
//       setFloors([]);
//       break;
//     default:
//       break;
//   }
// }
