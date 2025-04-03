import { Routes, Route } from "react-router-dom";
import initRoutes from "./routes";
import React from "react";

function App() {
  return (
    <Routes>
      {initRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={React.createElement(route.element)} />
      ))}
    </Routes>
  );
}

export default App;
