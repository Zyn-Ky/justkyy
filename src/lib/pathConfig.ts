export const DEFAULT_ROOT_PUBLIC_PATH_ID = "ROOT_ABOUT_ME"

export type PUBLIC_URL_PATH = {
    headerTitle: string
    path: string
    id: string
}

export const webPublicUrlPaths: PUBLIC_URL_PATH[] = [{
    headerTitle: "About Me",
    path: "/",
    id: "ROOT_ABOUT_ME"
}, {
    headerTitle: "Projects",
    path: "/projects",
    id: "PROJECTS"
}, {
    headerTitle: "Blog",
    path: "/blog",
    id: "BLOG_LISTING"
}]