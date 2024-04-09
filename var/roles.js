

const USER_ROLES = {
   admin: "admin",
   basic: "basic",
   user: "user"
}



const ACCESS_ROLE = {
   admin: ["/api", "/admin", "/admin/issues", "/admin/home", "/app"],
   basic: ["/home", "/about", "login", "/signup"],
   user: ["/app/", "/app/projects", "/app/profile", "/app/project/:id", "/app/logout", "/api"]
}