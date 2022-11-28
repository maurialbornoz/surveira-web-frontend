import { Navigate, useRoutes } from "react-router-dom";
import { useAuthState } from "../context/authContext";
import CreatePoll from "../pages/CreatePoll";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/register";
import User from "../pages/User";
const AppRouter = () => {
    const user = useAuthState()

    const routes = () => {
        const publicRoutes = [
          {
            path: "/",
            element: <Home />,
          },
        //   {
        //     path: COURSE_ROUTE,
        //     element: <CoursesPage />,
        //     children: [
        //       {
        //         path: "",
        //         element: <Navigate to={COURSE_CATALOG_FULL_ROUTE} replace />,
        //       },
        //       { path: COURSE_CATALOG_ROUTE, element: <CourseCatalogPage /> },
        //       {
        //         path: COURSE_ROUTE + ":id",
        //         element: <CoursePage />,
        //       },
        //     ],
        //   },
        //   {
        //     path: "*",
        //     element: <NotFound />,
        //   },
        ];
      
        const guestRoutes = [
          {
            path: "/login",
            element: !user.isAuthenticated ? <Login /> : <Navigate to="/user" />,
          },
          {
            path: "/register",
            element: !user.isAuthenticated ? <Register /> : <Navigate to="/user" />,
          },
        //   {
        //     path: ACCOUNT_ROUTE,
        //     element: isAuth ? <AccountPage /> : <Navigate to={"/login"} replace />,
        //   },
        ];
      
        const privateRoutes = [
          {
            path: "/user",
            element: user.isAuthenticated ? <User /> : <Navigate to="/login" />,
          },
          {
            path: "/create_poll",
            element: user.isAuthenticated ? <CreatePoll /> : <Navigate to="/login" />,
          },
        //   {
        //     path: ADMIN_COURSES_ROUTE,
        //     element: isAdmin ? <UnmoderCoursesPage /> : <NotAccess />,
        //   },
        ];
        return [...publicRoutes, ...guestRoutes, ...privateRoutes];
      };

    let element = useRoutes(routes())
    return element;
}
 
export default AppRouter;

// import {Route, Navigate, RouteProps, RouteComponentProps} from "react-router-dom"
// import { useAuthState } from "../context/authContext";
// import { RouteType } from "../types";

// // interface AppRouteProps extends RouteProps {
// type AppRouteProps = RouteProps & {
//     component: any
//     routeType: RouteType
// }

// const AppRoute = (props: { [x: string]: any; component: any; path: any; routeType: any; }) => {
//     const {component: Component, path, routeType, ...rest} = props

//     const user = useAuthState()
    
//     const renderComponent = (component: any , path: any, routhType: any) => {
//         switch(routeType) {
//             case "PRIVATE" :
//                 if(user.isAuthenticated){
//                     return component
//                 } else {
//                     // return <Redirect to="/login"></Redirect>
//                     return <Navigate replace to="/login" />
//                 }
//             case "GUEST":
//                 if(!user.isAuthenticated){
//                     return component
//                 } else {
//                     // return <Redirect to="/user"></Redirect>
//                     return <Navigate replace to="/user" />
//                 }
//             case "PUBLIC":
//                 return component
//         }
//     }
//     return ( 
//         <Route {...rest} path={path} element={{component}}></Route>
//      );
// }
 
// export default AppRoute;


