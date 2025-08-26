import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskList from "../pages/TaskBlock/TaskList/TaskList";
import MessengerList from "../pages/MessangerBlock/Messenger/MessengerList";
import ProcessList from "../pages/ProcessesBlock/ProcessesList/ProcessesList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskList />,
      },
      {
        path: "processes",
        element: <ProcessList />,
      },
      {
        path: "messages",
        element: <MessengerList />,
      },
    ],
  },
]);

export default router;
