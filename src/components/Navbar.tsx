"use client"
import {PropsWithChildren, useState} from "react";
import clsx from "clsx";
import {Box, Collapse} from "@mui/material";
import navbarCss from "./Navbar.module.css"
import {useWindowScroll, useWindowSize} from "react-use";

type NavItemProps = {
    enlarge?: boolean;
    hidden?: boolean;
    underline?: boolean;
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

export default function Navbar() {
    const [tempState, setTempState] = useState(false)
    const [tempState1, setTempState1] = useState(false)
    const {y} = useWindowScroll();
    const {height} = useWindowSize();
    const focusOnOneTitle = y >= (height * 50 / 100)
    return (<>
        <nav className="p-8 flex gap-2.5 fixed top-0 left-0 w-full h-24">
            {/*{y} {height}*/}
            {/*<NavItem hidden={focusOnOneTitle}>Projects</NavItem>*/}
            <NavItem enlarge={focusOnOneTitle} underline={true}>About Me</NavItem>
            <NavItem hidden={focusOnOneTitle}>Projects</NavItem>
            <NavItem hidden={focusOnOneTitle}>Blog</NavItem>
            <NavItem hidden={focusOnOneTitle}>Sign In</NavItem>
        </nav>
    </>);
}
