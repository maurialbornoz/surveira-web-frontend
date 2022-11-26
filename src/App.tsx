import { AuthProvider } from "./context/authContext";
// import Login from "./pages/Login";
// import Register from "./pages/register";
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import Home from "./pages/Home";
import { BrowserRouter as Router} from "react-router-dom"

// import routes from "./router/routes";
import AppRouter from "./router/AppRouter";
import Navigation from "./components/Navigation";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation></Navigation>
        <AppRouter></AppRouter>
      </Router>
    </AuthProvider>
      
    
  );
}

        // <Routes>
        //   {
        //     routes.map(route => <AppRoute
        //       component={route.component}
        //       path={route.path}
        //       routeType={route.routeType}
        //       key={route.path}
        //       ></AppRoute>
        //       )
        //   }
          
        // </Routes>

// <Route path="/login" element={<Login/>}/>
// <Route path="/register" element={<Register/>}/>
// <Route path="/" element={<Home/>}/>

export default App;
