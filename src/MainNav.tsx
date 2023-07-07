import { Link } from "react-router-dom";
import "./styles/MainNav.css";

function MainNav() {
  return (
    <nav className="header">
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        <li>
          <Link to="/floors">Floors</Link>
        </li>
        <li>
          <Link to="/websocket">Websocket</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
