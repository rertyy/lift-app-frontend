import "../styles/Floors.css";

type LiftButtonProps = {
  floorNum: number;
  handleClick: (floorNum: number) => void;
  selected: boolean;
};

export default function LiftButton({
  floorNum,
  handleClick,
  selected,
}: LiftButtonProps) {
  const styles = selected ? "lift-button-selected" : "lift-button";

  return (
    <li>
      <button className={styles} onClick={() => handleClick(floorNum)}>
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
