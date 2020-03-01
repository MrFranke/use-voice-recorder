import * as ReactDOM from 'react-dom';
import * as React from "react";
import { App } from "./App";


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.querySelector('#app')
  );
});
