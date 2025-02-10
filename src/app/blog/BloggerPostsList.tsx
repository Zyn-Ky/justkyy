import {fetchAllBloggerPosts} from "@/lib/blogger";
import {Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default async function BloggerPostsList() {
    const {error, posts} = await fetchAllBloggerPosts();
    return <>
        {error.isError && <p>Error</p>}
        {posts.map((post) => (
            <Card key={post.id} elevation={3} className="mb-4 min-h-32">
                <CardActionArea component={Link} href={`/blog/post/blogger-${post.id}-${post.blogId}`}>
                    <div className="flex flex-col sm:flex-row">
                        {post.headerImageUrl && (
                            <CardMedia
                                component="img"
                                className="w-full sm:!w-[151px] min-h-32 sm:h-auto md:h-32 object-contain"
                                image={post.headerImageUrl}
                                alt=""
                            />
                        )}
                        <CardContent>
                            <p>
                                <Tooltip title="From Blogger" placement="top">
                                    <GoogleIcon/>
                                </Tooltip>
                                Blogger
                            </p>
                            <Typography variant="h6" component="p" fontWeight="bold">{post.title}</Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
        ))}
    </>
}