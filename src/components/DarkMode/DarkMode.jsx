import React, { useEffect, useState } from "react";
import Sun from "./Sun.svg";
import Moon from "./Moon.svg";

import "./DarkMode.css";

const DarkMode = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("selectedTheme") || "light"
  );

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme);
  }, [selectedTheme]);

  const toggleTheme = () => {
    setSelectedTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        {selectedTheme === "dark" ? <Moon /> : <Sun />}
      </label>
    </div>
  );
};

export default DarkMode;
