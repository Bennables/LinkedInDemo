import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router';
import SixSquareGrid from './pages/Home';
import NewHiresTablePage from './pages/HireDash';
import UserPage from './pages/UserPage';
import LexicalEdit from './pages/EmailBody';
import EmailBodiesList from './pages/EmailBodiesList';
import HirePage from './pages/HirePage';
import DepartmentTable from './pages/ViewDepartments';
import CreateDepartment from './pages/CreateDepartment';
import EditDepartment from './pages/EditDepartment';
import Login from './pages/Login';
import Stuff from './pages/TestRefresh';
import TaskTable from './pages/ViewTask';
import EditTask from './pages/EditTask';
import CreateTask from './pages/CreateTask';
import TaskStepsPage from './pages/TaskStepsPage';


const router = createBrowserRouter([
  {path:"/", element: <SixSquareGrid/>},
  {path:"/hires", element: <NewHiresTablePage/>},
  {path:"/hires/user/:id", element: <UserPage />},
  {path:"/hires/hire/:id", element: <HirePage/>},
  {path:"/email-bodies", element: <EmailBodiesList/>},
  {path:"/email-bodies/:id", element: <LexicalEdit/>},
  {path:"/email-bodies/new", element: <LexicalEdit/>},
  {path:"/departments", element: <DepartmentTable/>},
  {path:"/departments/:deptname", element: <EditDepartment/>},

  {path:"/departments/new", element: <CreateDepartment/>},

  {path:"/login", element: <Login/>},
  {path:"/refresh", element: <Stuff/>},
  {path:"/tasks", element: <TaskTable/>},
  {path:"/tasks/new", element: <CreateTask/>},
  {path:"/tasks/:taskId", element: <TaskStepsPage/>},
  {path:"/tasks/edit/:taskname", element: <EditTask/>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <RouterProvider router = {router}/>
  </StrictMode>,
)
