import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export enum ToServerType {
  AddFloor,
  RemoveFloor,
  ResetFloors,
  UpdateCurrentFloor,
  UpdateAverageTime,
  UpdateLiftRequests,
}

export enum FromServerType {
  AddFloor = 100,
  RemoveFloor,
  ResetFloors,
  UpdateCurrentFloor,
  UpdateAverageTime,
  UpdateLiftRequests,
}

type ToServerMessage = {
  type: ToServerType;
  data: number;
};

export function sendToServer(
  sendJsonMessage: SendJsonMessage | undefined,
  requestType: ToServerType,
  floorNum: number,
) {
  if (sendJsonMessage) {
    const message: ToServerMessage = {
      type: requestType,
      data: floorNum,
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
