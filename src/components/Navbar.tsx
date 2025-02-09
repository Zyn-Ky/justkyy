"use client"
import {PropsWithChildren, RefObject, useCallback, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Box, Collapse} from "@mui/material";
import navbarCss from "./Navbar.module.css"
import {useScroll, useWindowSize} from "react-use";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {DEFAULT_ROOT_PUBLIC_PATH_ID, webPublicUrlPaths} from "@/lib/pathConfig";

const ENLARGED_TITLE_DEFAULT_THRESHOLD = 1 / 10000000;
const ENLARGED_TITLE_ROOT_ABOUT_ME_THRESHOLD = 50 / 100;

type NavItemProps = {
    enlarge?: boolean;
    hidden?: boolean;
    underline?: boolean;
    href: string;
}

type NavProps = {
    onChangeHeaderHeight(currentHeight: number, isInFocus: boolean): void;
    containerRef: RefObject<HTMLElement>;
    disableEnlargeTitle?: boolean;
}

function NavItem({children, enlarge, hidden, underline, href}: PropsWithChildren<NavItemProps>) {

    const linkRef = useRef<HTMLAnchorElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hiddenAnchor, setHiddenAnchor] = useState(false);
    const onActiveTransitionEnd = useCallback(() => {
        if (enlarge) setHiddenAnchor(true);
    }, [enlarge])
    useEffect(() => {
        if (linkRef.current) {
            linkRef.current.addEventListener("transitionend", onActiveTransitionEnd)
        }
        return () => {
            if (linkRef.current) {
                linkRef.current.removeEventListener("transitionend", onActiveTransitionEnd)
            }
        }
    }, [linkRef.current]);
    return (<>
        <Collapse orientation="horizontal" in={!(hidden ?? false)}>
            <div className="relative">

                {underline && (
                    <span className={clsx(navbarCss["item"], "opacity-0", "pointer-events-none", "select-none", {
                        [navbarCss["enlarged-as-title"]]: enlarge
                    })} tabIndex={-1}>{children && children}</span>
                )}

                <Link className={clsx(navbarCss["item"], {
                    ["opacity-0"]: enlarge,
                    ["absolute"]: underline,
                    ["left-0"]: underline,
                    ["top-0"]: underline,
                    [navbarCss["enlarged-as-title"]]: enlarge,
                    "pointer-events-none": enlarge,
                    "select-none": enlarge
                })}
                      tabIndex={enlarge ? -1 : 0}
                      href={href ?? "#"}>{children && children}</Link>
                {underline && (
                    <h1 className={clsx(navbarCss["item"], navbarCss["enlarged-as-title"], "opacity-0", "absolute", "left-0", "top-0", {
                        ["opacity-100"]: enlarge,
                        "pointer-events-none": !enlarge,
                        "select-none": !enlarge,
                    })}>{children && children}</h1>
                )}
                <div className="absolute bottom-[-4px] left-0 right-0">
                    <Collapse in={underline && !enlarge} orientation="vertical">
                        <Box sx={{
                            backgroundColor: "black",
                            height: 2.5,
                            width: "100%",
                            borderRadius: 4,
                        }}></Box>
                    </Collapse>
                </div>
            </div>
        </Collapse>
    </>);
}

/**
 Issue:
 TS71007: Props must be serializable for components in the "use client" entry file. "onChangeHeaderHeight" is a function that's not a Server Action. Rename "onChangeHeaderHeight" either to "action" or have its name end with "Action" e. g. "onChangeHeaderHeightAction" to indicate it is a Server Action.

 https://github.com/vercel/next.js/discussions/46795#discussion-4929214

 Temp Solution:
 https://stackoverflow.com/a/79045197
 */
export default function Navbar({onChangeHeaderHeight, containerRef, disableEnlargeTitle}: NavProps) {
    // const {y} = useWindowScroll();
    // Use from 'containerRef' element instead from body
    const {y} = useScroll(containerRef)
    const {height} = useWindowSize();
    const navContainerRef = useRef<HTMLElement>(null);
    const animationFrameRef = useRef<number>(0);

    const currentPathname = usePathname();
    const activePathID = webPublicUrlPaths.find(({path}) => path.indexOf(currentPathname) > -1)?.id ?? "DEFAULT_ROOT_PUBLIC_PATH_ID";

    const currentEnlargeThreshold = activePathID === DEFAULT_ROOT_PUBLIC_PATH_ID ? ENLARGED_TITLE_ROOT_ABOUT_ME_THRESHOLD : ENLARGED_TITLE_DEFAULT_THRESHOLD
    const focusOnOneTitle = disableEnlargeTitle ? false : y >= (height * currentEnlargeThreshold);

    const callAnimationFrame = useCallback(() => {
        if (navContainerRef.current) {
            onChangeHeaderHeight(navContainerRef.current.getBoundingClientRect().height, focusOnOneTitle)
        }
        animationFrameRef.current = requestAnimationFrame(callAnimationFrame)
    }, [focusOnOneTitle]);

    useEffect(() => {
        // const intervalID = 0;
        if (navContainerRef.current) {
            onChangeHeaderHeight(navContainerRef.current.getBoundingClientRect().height, focusOnOneTitle)
            callAnimationFrame()
        }
        return () => {
            // clearInterval(intervalID)
            cancelAnimationFrame(animationFrameRef.current)
        }
    }, [focusOnOneTitle, y, navContainerRef.current, disableEnlargeTitle])
    return (<>
        <nav ref={navContainerRef}
             className={`${navbarCss.backhead} z-40 p-8 flex gap-2.5 fixed top-0 left-0 w-full h-auto whitespace-nowrap`}>
            {webPublicUrlPaths.map(({path, headerTitle, id}, idx) => (
                <NavItem enlarge={focusOnOneTitle && id === activePathID}
                         hidden={focusOnOneTitle && id !== activePathID} underline={id === activePathID} href={path}
                         key={idx}>{headerTitle}</NavItem>))}


        </nav>
    </>);
}
