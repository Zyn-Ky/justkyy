"use client"

import {ReactNode, RefObject, useEffect, useMemo, useRef, useState} from "react";
import whichBrowser from "@/lib/userAgentDetect";
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import Navbar from "@/components/Navbar";
import FancyFooter from "@/components/FancyFooter";
import {usePathname} from "next/navigation";

const disabledAnimMode = {
    components: {
        // Name of the component ⚛️
        MuiCssBaseline: {
            styleOverrides: {
                '*, *::before, *::after': {
                    transition: 'none !important',
                    animation: 'none !important',
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                // The props to apply
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
        },
    },
    transitions: {
        // So `transition: none;` gets applied everywhere
        create: () => 'none',
    },
}

export default function ClientWrapper({children}: { children: ReactNode }) {
    const [navigationHeight, setNavigationHeight] = useState(88);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [browserType, setBrowserType] = useState<ReturnType<typeof whichBrowser>>("Unknown");
    const isReducedMotion = useMediaQuery(
        "(prefers-reduced-motion: reduce)"
    )
    const pathname = usePathname();
    const muiTheme = useMemo(() => {
        return createTheme({
            ...(isReducedMotion ? disabledAnimMode : {})
        });
    }, [isReducedMotion])

    useEffect(() => {
        setBrowserType(whichBrowser());
    }, [])
    return <ThemeProvider theme={muiTheme}>
        <>
            <Navbar onChangeHeaderHeight={(navHeight) => {
                setNavigationHeight(navHeight)
            }} containerRef={containerRef as RefObject<HTMLElement>}
                    disableEnlargeTitle={browserType === "Safari"}
            />
            <div ref={containerRef}
                 className="h-[-webkit-fill-available] supports-[-moz-appearance:none]:h-full snap-y snap-mandatory overflow-auto fixed left-0 right-0 bottom-0 overscroll-contain"
                 style={{
                     // top: `${navigationHeight}px`,
                     paddingTop: `${(browserType !== "Chrome") ? navigationHeight : 0}px`,
                     marginTop: `${(browserType === "Chrome") ? navigationHeight : 0}px`,
                     // scrollPaddingTop: `${navigationHeight}px`
                     scrollMarginTop: `${navigationHeight}px`
                 }}>
                {children && children}
                {pathname !== "/" && (
                    <FancyFooter/>
                )}
            </div>
        </>
    </ThemeProvider>
}