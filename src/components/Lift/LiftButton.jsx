import PropTypes from "prop-types";

function LiftButton({ floorNum, handleClick }) {
    return (
        <li>
            <button onClick={() => handleClick(floorNum)}>{floorNum}</button>
        </li>
    );
}

LiftButton.propTypes = {
    floorNum: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default LiftButton;
