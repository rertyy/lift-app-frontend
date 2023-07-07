type LiftButtonProps = {
  floorNum: number;
  handleClick: (floorNum: number) => void;
};

export default function LiftButton({ floorNum, handleClick }: LiftButtonProps) {
  return (
    <li>
      <button className="lift-button" onClick={() => handleClick(floorNum)}>
        {floorNum}
      </button>
    </li>
  );
}

// This is the alternative way to do typing for props
// type Two = (a: number) => void;
// function LiftButton2({ floorNum, handleClick }: {floorNum: number, handleClick: (a:number) => void}) {
//     return (
//         <li>
//             <button onClick={() => handleClick(floorNum)}>{floorNum}</button>
//         </li>
//     );
// }
