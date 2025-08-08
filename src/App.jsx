import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import {  persistor, store } from "./redux/store";
import Home from "./components/layout/index";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
