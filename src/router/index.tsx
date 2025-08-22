import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TaskList from "../pages/TaskBlock/TaskList/TaskList";
import ProcessList from "../pages/ProcessesBlock/ProcessesList/ProcessesList";
import MessengerList from "../pages/MessangerBlock/Messenger/MessengerList";

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
