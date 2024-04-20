import React from "react";
import "../css/Header.css"
import Button from "./Button";
import { Link } from "react-router-dom";

function Header () {
    return (
        <div className="top-menu">
            <img src="https://ssb.wiki.gallery/images/7/7f/WiiFitSymbol.svg" alt=""></img>Gym Buddy
        <br></br>
        <div className="click-contain"></div>
        <Link to="/">
        <Button className="main-button">
            Profile
        </Button>
        </Link>
        <Link to="/history">
        <Button className="main-button">
            Workout History
        </Button>
        </Link>
        <Link to="/excercises">
        <Button className="main-button">
            Excercises
        </Button>
        </Link>
        </div>
    );
}

export default Header