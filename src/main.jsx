import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import TaskPage from './pages/TaskPage'
import TaskNotFound from './components/404NotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <TaskNotFound />
  },
  {
    path: "/task/:id",
    element: <TaskPage />,
    errorElement: <TaskNotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
