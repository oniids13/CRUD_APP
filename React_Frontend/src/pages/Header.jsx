import React from "react";
import { Link } from "react-router-dom";


function Header() {

    return (
        <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/create-item">Create Item</Link>
              </li>
          </ul>
        </nav>
      </header>
    )
}

export default Header