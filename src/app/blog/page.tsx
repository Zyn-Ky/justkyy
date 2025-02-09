import PublicBetaSection from "@/components/SSR/PublicBetaSection";
import ProtectedUI from "@/components/SSR/ProtectedUI";

export default function BlogListPage() {
    return <>
        <ProtectedUI fallbackElement={<>
            <PublicBetaSection/>
        </>} forceFallbackElement={true}>
        </ProtectedUI>
    </>
}