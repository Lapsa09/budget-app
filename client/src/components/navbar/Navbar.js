import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pathname = window.location.pathname;

    setActive(() => {
      return pathname == "/" ? 0 : pathname == "/movements" ? 1 : 2;
    });
  }, []);

  return (
    <nav className="navbar">
      <Link
        value={0}
        onClick={() => setActive(0)}
        className={`link ${active == 0 && "active"}`}
        to="/"
      >
        Home
      </Link>
      <Link
        value={1}
        onClick={() => setActive(1)}
        className={`link ${active == 1 && "active"}`}
        to="/movements"
      >
        Movements
      </Link>

      <Link
        value={2}
        onClick={() => setActive(2)}
        className={`link ${active == 2 && "active"}`}
        to="/new"
      >
        New Movement
      </Link>
    </nav>
  );
}

export default Navbar;
