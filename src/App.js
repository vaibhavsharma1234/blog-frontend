// componnets
import Login from "./components/account/login";
import Home from "./components/account/home/Home"
import DataProvider from "./context/DataProvider";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import { useState } from "react"
import CreatePost from "./components/create/CreatePost";
import UpdatePost from "./components/create/Update";
import DetailView from "./components/details/DetailView";
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <><Header /><Outlet /></> : <Navigate replace to="/login" />
}
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (

    <DataProvider>
      <BrowserRouter>

        <div style={{ marginTop: "64" }} >
          <Routes>

            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            {/* wrap the component where  u want excess browser router wrap enable routinhg jha jha routing wha wrap by  roytes */}
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            {/* https://stackoverflow.com/questions/69923420/how-to-use-private-route-in-react-router-domv6 */}
              <Route path="/" element={<Home />} />
              {/* refresh krte hai back to login as isUserAuthenticated will be false  */}
            </Route>
            <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
              {/* refresh krte hai back to login as isUserAuthenticated will be false  */}
            </Route>
            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailView />} />
              {/* refresh krte hai back to login as isUserAuthenticated will be false  
               this :id is a param 
               on click of the post open detail view
              */}
              
            </Route>
            <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<UpdatePost/>} />
              {/* refresh krte hai back to login as isUserAuthenticated will be false  
               this :id is a param 
               on click of the post open detail view */}
             
              
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>

  );
}
// urlbased routiing 

export default App;
