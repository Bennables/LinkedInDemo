import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router';
import SixSquareGrid from './pages/Home';
import NewHiresTablePage from './pages/HireDash';
import UserPage from './pages/UserPage';
import LexicalEdit from './pages/EmailBody';
import EmailBodiesList from './pages/EmailBodiesList';
import HirePage from './pages/HirePage';


const router = createBrowserRouter([
  {path:"/", element: <SixSquareGrid/>},
  {path:"/hires", element: <NewHiresTablePage/>},
  {path:"/hires/user/:id", element: <UserPage />},
  {path:"/hires/hire/:id", element: <HirePage/>},
  {path:"/email-bodies", element: <EmailBodiesList/>},
  {path:"/email-bodies/:id", element: <LexicalEdit/>},
  {path:"/email-bodies/new", element: <LexicalEdit/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <RouterProvider router = {router}/>
  </StrictMode>,
)
