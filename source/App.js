import React from "react";
import { render } from "react-dom";
import Demo from "./components/Demo";

window.onerror = function(){ return true; } // IGNORE ALL ERROR JAVASCRIPT!    

render(
      <Demo/>, document.getElementById('app')
); 