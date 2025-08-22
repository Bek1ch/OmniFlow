import { createBrowserRouter } from "react-router";
import MessengerList from "../components/MessengerList";
import ProcessList from "../components/ProcessList";
import TaskList from "../components/TaskList";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TaskList />,
      },
      {
        path: "/processes",
        element: <ProcessList />,
      },
      {
        path: "/messages",
        element: <MessengerList />,
      },
    ],
  },
]);

export default router;
