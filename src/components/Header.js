import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>Redux</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="post">글쓰기</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
