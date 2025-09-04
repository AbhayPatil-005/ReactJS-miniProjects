
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { ContactUs } from "./components/pages/ContactUs";
import { Store } from "./components/pages/Store";


function App() {
  const router =createBrowserRouter([
    {path: '/about', element: <About/>},
    {path: '/', element: <Home/> },
    {path:'/store', element: <Store/>},
    {path:'/contact-us', element: <ContactUs/>}
  ])
  return (<RouterProvider router={router}/>)
}

export default App;
