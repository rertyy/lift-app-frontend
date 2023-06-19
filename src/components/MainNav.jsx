import { Link } from "react-router-dom";
import "./MainNav.css";

function MainNav() {
  return (
    <nav className="header">
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/floors">Floors</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
