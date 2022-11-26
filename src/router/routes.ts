import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/register"
import User from "../pages/User"
import { Route } from "../types"

const routes: Route[] = [
    {
        path: "/",
        component: Home,
        routeType: "PUBLIC"
    },
    {
        path: "/login",
        component: Login,
        routeType: "GUEST"
    },
    {
        path: "/register",
        component: Register,
        routeType: "GUEST"
    },
    {
        path: "/user",
        component: User,
        routeType: "PRIVATE"
    }
]

export default routes;