import { createBrowserRouter } from "react-router";
import MessengerList from "../pages/MessangerBlock/Messenger/MessengerList";
import ProcessList from "../pages/ProcessesBlock/ProcessesList/ProcessesList";
import TaskList from "../pages/TaskBlock/TaskList/TaskList";
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
