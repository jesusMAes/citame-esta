import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Inputs from './inputs';

//este componente se encarga de recojer los otros y meterlos en el html, la lógica va en los otros componentes

//centrate, vamos a tener dos componentes, el formulario y el output, los creamos aparte y los importamos aquí

//app solo crea un div envolvedor podría quitarse
const root = ReactDOM.createRoot(document.getElementById('react-components'));
root.render(
  <React.StrictMode>
    <App />
    <Inputs />
  </React.StrictMode>
);


