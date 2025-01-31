"use client"
import {PropsWithChildren, RefObject, useEffect, useRef} from "react";
import clsx from "clsx";
import {Box, Collapse} from "@mui/material";
import navbarCss from "./Navbar.module.css"
import {useScroll, useWindowSize} from "react-use";

type NavItemProps = {
    enlarge?: boolean;
    hidden?: boolean;
    underline?: boolean;
}

type NavProps = {
    onChangeHeaderHeight(currentHeight: number, isInFocus: boolean): void;
    containerRef: RefObject<HTMLElement>;
}

function NavItem({children, enlarge, hidden, underline}: PropsWithChildren<NavItemProps>) {
    return (<>
        <Collapse orientation="horizontal" in={!(hidden ?? false)} unmountOnExit>
            <div className="relative">
                <a className={clsx(navbarCss["item"], {
                    [navbarCss["enlarged-as-title"]]: enlarge,
                })} href="/">{children && children}</a>
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
export default function Navbar({onChangeHeaderHeight, containerRef}: NavProps) {
    // const {y} = useWindowScroll();
    // Use from 'containerRef' element instead from body
    const {y} = useScroll(containerRef)
    const {height} = useWindowSize();
    const navContainerRef = useRef<HTMLElement>(null);
    const focusOnOneTitle = y >= (height * 70 / 100)
    useEffect(() => {
        if (navContainerRef.current) {
            onChangeHeaderHeight(navContainerRef.current.getBoundingClientRect().height, focusOnOneTitle)
        }
    }, [focusOnOneTitle, y, navContainerRef.current])
    return (<>
        <nav ref={navContainerRef}
             className={`${navbarCss.backhead} z-40 p-8 flex gap-2.5 fixed top-0 left-0 w-full h-auto whitespace-nowrap`}>
            <NavItem enlarge={focusOnOneTitle} underline={true}>About Me</NavItem>
            <NavItem hidden={focusOnOneTitle}>Projects</NavItem>
            <NavItem hidden={focusOnOneTitle}>Blog</NavItem>
            <NavItem hidden={focusOnOneTitle}>Sign In</NavItem>
        </nav>
    </>);
}
