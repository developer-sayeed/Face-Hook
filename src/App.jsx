import { RouterProvider } from "react-router-dom";
import router from "./router/Router";

const App = () => {
  console.log("hello");
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
