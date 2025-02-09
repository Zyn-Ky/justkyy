import PublicBetaSection from "@/components/SSR/PublicBetaSection";
import {Typography} from "@mui/material";

function NotFoundPage() {
    return <>
        <Typography textAlign="center" component={"h1"} variant="h2" my={12} fontWeight="bold">404 Page Not
            found!</Typography>
        <PublicBetaSection/>
    </>
}

export default NotFoundPage