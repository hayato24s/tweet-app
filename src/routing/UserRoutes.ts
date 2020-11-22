export const UserRoutes = [
    {
        method: "get",
        route: "/users",
        action: "findUsers"
    },
    {
        method: "get",
        route: "/users/:name",
        action: "findUserByName"
    },
    {
        method: "post",
        route: "/users",
        action: "createUser"
    },
    {
        method: "put",
        route: "/users/:name",
        action: "updateUser"
    },
    {
        method: "delete",
        route: "/users/:name",
        action: "deleteUser"
    }
]
