import React from "react";
import { HashRouter as Routes, Route } from "react-router-dom";
import Home from "../components/Home";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" component={Home} />
    </Routes>
  );
}
