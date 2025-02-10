import {Box, Paper, Typography} from "@mui/material";
import WaveImg from "@/external/icons/wave-ios-emoji.png"
import Image from "next/image";
import SchoolIcon from '@mui/icons-material/School';
import PublicBetaSection from "@/components/SSR/PublicBetaSection";
import ProtectedUI from "@/components/SSR/ProtectedUI";

export default function Home() {
    return <>
        <div className="h-full snap-end flex items-start justify-center container mx-auto">
            <Paper elevation={3}
                   square={false}
                   className="sm:p-8 p-6 mt-4 !rounded-[28px] w-full h-[90%]"
            >
                <Typography variant="h2" component="p">
                    <Image src={WaveImg} alt="👋" title="👋 iOS Wave Emoji" width={64} height={64}/>
                </Typography>
                <Typography variant="h3" component="h1" fontWeight={800}><span
                    className="sm:text-[length:inherit] text-base">Hello, I’m</span><br/>Kornelius
                    Yabes</Typography>
            </Paper>
        </div>
        <div className="h-full snap-center px-8 container mx-auto">
            <ProtectedUI fallbackElement={<>
                <PublicBetaSection/>
            </>}>
                <p>Last updated in 6969</p>
                <Box display="flex">
                    <Box display="flex" gap="0.5rem" minHeight="64px">
                        <SchoolIcon width={64} height={64} fontSize="large"/>
                        <Box display="flex" flexDirection="column">
                            <p>Education</p>
                        </Box>
                    </Box>
                </Box>
            </ProtectedUI>

        </div>
    </>;
}
