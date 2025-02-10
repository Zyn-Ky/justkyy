import PublicBetaSection from "@/components/SSR/PublicBetaSection";
import ProtectedUI from "@/components/SSR/ProtectedUI";
import {Suspense} from "react";
import BloggerPostsList from "@/app/blog/BloggerPostsList";
import BetterCircularProgress from "@/components/BetterCircularProgress";

export default async function BlogListPage() {
    return <>

        <div className="flex gap-4 mx-auto container p-4 flex-col sm:flex-row">
            <div className="flex-auto flex flex-col">
                <Suspense fallback={<>
                    <BetterCircularProgress/>
                </>}>
                    <BloggerPostsList/>
                </Suspense>
            </div>
            <div className="min-w-72 w-full">
                <ProtectedUI fallbackElement={<PublicBetaSection/>} forceFallbackElement={true}>
                    <input type="text" name="" id="" placeholder="Search..."/>
                </ProtectedUI>
            </div>
        </div>
    </>
}