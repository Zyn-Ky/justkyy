import {fetchSingleBloggerPost, SingleBloggerPostItem} from "@/lib/blogger";
import {notFound} from "next/navigation";
import {Typography} from "@mui/material";

export const dynamic = 'force-static';


export default async function BlogPost({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;
    const hasManyId = Array.isArray(id);
    const urlId = hasManyId ? id[0] : id || "";
    let backendPostResponse: SingleBloggerPostItem | null = null;
    if (urlId.split("-")[0] === "blogger") {
        const postId = urlId.split("-")[1];
        const blogId = urlId.split("-")[2];
        backendPostResponse = (await fetchSingleBloggerPost({
            blogId,
            postId
        }))
    }
    if (!backendPostResponse) notFound();
    if (backendPostResponse.error.isError && backendPostResponse.error.code === 404 && !backendPostResponse.post && backendPostResponse?.post === null) {
        notFound()
    }
    // @ts-expect-error Null safety should be covered by above if statement
    const {title, content} = backendPostResponse.post;
    return (<div className="pt-4 px-8 container mx-auto">
        <Typography variant="h3" component="h1" fontWeight={700}>{title}</Typography>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>)
}