import {Link} from "react-router-dom";

const Welcome = () => (
    <div>
        <h1>Welcome to the Lift Website!</h1>
        <p>
            Click <Link to="/floors"> here </Link> to start
        </p>
    </div>
);

export default Welcome