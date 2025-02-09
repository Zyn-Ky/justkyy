import Grid from "@mui/material/Grid2";
import {Button, Paper} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from "next/image";
import PublicBetaSection from "@/components/SSR/PublicBetaSection";
import ProtectedUI from "@/components/SSR/ProtectedUI";

export default function ProjectsPage() {
    return <>
        <ProtectedUI fallbackElement={<>
            <PublicBetaSection/>
        </>} forceFallbackElement={true}>

            <div className="px-2 md:px-16 py-2 transition-all max-w-[1630px] mx-auto">
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 8, lg: 12}}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid key={index} size={{xs: 2, sm: 4, md: 4}} justifyItems="center">
                            <Paper sx={{
                                padding: "1rem",
                                borderRadius: "28px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                maxWidth: 550,
                                width: "100%",
                                minHeight: 280
                            }}
                                   elevation={8}>
                                <div className="flex">
                                    <div className="flex-1"></div>
                                    <div><Button endIcon={<ChevronRightIcon/>}
                                                 sx={{textTransform: "capitalize", borderRadius: "28px"}}>View
                                        More</Button>
                                    </div>
                                </div>
                                <div className="relative h-[66.6%] w-full flex-1 aspect-[6/4]">
                                    <Image className="rounded-[28px] text-center" alt="Placeholder" fill={true}
                                           src="https://fakeimg.pl/600x400/"/>
                                </div>
                                <div className="text-center">
                                    <h1>Example #1</h1>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {[...new Array(10)].map((_, i) => (<p key={i}>#{i} Dummy Text To Fill Height</p>))}
            </div>
        </ProtectedUI>
    </>
}