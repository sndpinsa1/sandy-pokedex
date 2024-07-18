import React from "react";

import "@fortawesome/fontawesome-free/css/all.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./store/store";

const appRoutes = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={appRoutes}></RouterProvider>
    </Provider>
  );
};

export default App;
