import {Paper, Typography} from "@mui/material";
import Link from "next/link";

export default function FancyFooter() {
    return <>
        <Paper component="footer" elevation={3} className="flex w-full flex-col">
            <section className="flex gap-4 flex-grow h-64 p-8">
                <div>
                    <Typography variant="h6" fontWeight="bold">Social</Typography>
                    <ul className="list-disc">
                        <li>
                            <Link target="_blank" href="https://github.com/Zyn-Ky/">
                                Github
                            </Link>
                        </li>
                        <li>
                            <Link target="_blank" href="https://www.instagram.com/kornel.yg___08/">
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="p-4">
                &copy; Kornelius Yabes {new Date().getFullYear()}
            </section>
        </Paper>
    </>
}