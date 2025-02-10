/* eslint-disable  @typescript-eslint/no-explicit-any */
import {getFirstImageAsUrl} from "@/lib/blogger/htmlParser";
import {cache} from "react";

const BLOGGER_API_KEY = process.env.BLOGGER_API_KEY ?? "";
const BLOG_ID = process.env.BLOGGER_BLOG_WEB_ID ?? "";

interface BloggerPostItem {
    id: string;
    published_date: string;
    updated_date: string;
    actualBloggerUrl: string;
    headerImageUrl?: string;
    title: string;
    content?: string;
    blogId: string;
    author: {
        displayName: string;
        uid: string;
        url: string;
        avatar_url?: string;
    };
}

interface ListAllBloggerPosts {
    error: {
        isError: boolean;
        code?: number;
        message?: string;
    }
    posts: BloggerPostItem[];
}

export interface SingleBloggerPostItem {
    error: {
        isError: boolean;
        code?: number;
        message?: string;
    }
    post: BloggerPostItem | null;
}


interface FetchAllBloggerPostsProps {
    blogId?: string;
}

interface FetchSingleBloggerPostProps {
    blogId: string;
    postId: string;
}

export const fetchSingleBloggerPost = cache(async function ({
                                                                postId,
                                                                blogId
                                                            }: FetchSingleBloggerPostProps): Promise<SingleBloggerPostItem> {
        const API_URL = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${BLOGGER_API_KEY}`;
        const response = await fetch(API_URL);
        // if (!response.ok) {
        //     return {
        //         error: {
        //             isError: true,
        //             code: response.status,
        //             message: `Failed to fetch blogger post`,
        //         },
        //         post: null
        //     }
        // }
        try {
            const postItemResponse = await response.json();
            if (postItemResponse?.error || postItemResponse?.kind !== "blogger#post") {
                return {
                    error: {
                        isError: true,
                        code: 404,
                        message: "Post not found",
                    },
                    post: null,
                }
            }
            console.log(postItemResponse);
            return {
                error: {isError: false},
                post: {
                    id: postItemResponse.id,
                    blogId: postItemResponse.blog?.id ?? "0",
                    title: postItemResponse.title ?? "",
                    content: postItemResponse.content,
                    actualBloggerUrl: postItemResponse.url,
                    published_date: postItemResponse.published,
                    updated_date: postItemResponse.updated,
                    author: {
                        displayName: postItemResponse.author.displayName ?? "Unknown",
                        url: postItemResponse.author.url,
                        avatar_url: postItemResponse.author.image.url,
                        uid: postItemResponse.author.id
                    }
                }
            }
        } catch {
            return {
                error: {isError: true, code: 500, message: `Failed to parse blogger post`}, post: null
            }
        }
    }
)

export const fetchAllBloggerPosts = cache(async function (param?: FetchAllBloggerPostsProps): Promise<ListAllBloggerPosts> {
    const blogId = param?.blogId ?? BLOG_ID;
    const API_URL = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${BLOGGER_API_KEY}`
    const response = await fetch(API_URL);
    if (!response.ok || response.status >= 400) {
        return {
            error: {isError: true, code: response.status, message: `Failed to fetch posts`}, posts: []
        }
    }
    try {
        const posts = await response.json();
        if (posts?.error) {
            const status = posts?.error.status;
            return {
                error: {
                    isError: true,
                    code: status === "INVALID_ARGUMENT" ? 500 : 400,
                    message: status === "INVALID_ARGUMENT" ? `Internal Server Error` : `Failed to fetch posts`
                },
                posts: []
            }
        }
        if (posts?.items && posts?.kind === "blogger#postList") {
            return {
                error: {
                    isError: false,
                },
                posts: posts.items.map((post: any) => ({
                    id: post.id,
                    published_date: post.published,
                    updated_date: post.updated,
                    title: post.title,
                    actualBloggerUrl: post.url,
                    blogId: post.blog.id,
                    headerImageUrl: getFirstImageAsUrl(post.content ?? ""),
                    author: {
                        displayName: post.author.displayName,
                        uid: post.author.id,
                        url: post.author.url,
                        avatar_url: post.author.image?.url ?? null,
                    }
                }))
            }
        }
        return {
            error: {
                isError: true,
                code: 500,
                message: `Internal Server Error. Please Contact Webmaster`
            },
            posts: []
        }
    } catch {
        return {
            error: {isError: true, code: 500, message: `Failed to parse posts`}, posts: []
        }
    }
})