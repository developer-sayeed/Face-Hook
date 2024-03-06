import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./PublicRouter";

// create browser router
const router = createBrowserRouter([...publicRouter]);

// export router
export default router;
