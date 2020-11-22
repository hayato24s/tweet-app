export const PostRoutes = [
    {
        method: "get",
        route: "/posts",
        action: "findPosts"
    },
    {
        method: "get",
        route: "/posts/:id",
        action: "findPostById"
    },
    {
        method: "post",
        route: "/posts",
        action: "createPost"
    },
    {
        method: "delete",
        route: "/posts/:id",
        action: "deletePost"
    }
]