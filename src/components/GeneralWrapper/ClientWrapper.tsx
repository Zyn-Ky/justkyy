"use client"

import Navbar from "@/components/Navbar";
import {ReactNode, RefObject, useRef, useState} from "react";

export default function ClientWrapper({children}: { children: ReactNode }) {
    const [navigationHeight, setNavigationHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    return <>
        <Navbar onChangeHeaderHeight={(navHeight) => {
            setNavigationHeight(navHeight)
        }} containerRef={containerRef as RefObject<HTMLElement>}/>
        <div ref={containerRef}
             className="h-[-webkit-fill-available] supports-[-moz-appearance:none]:h-full snap-y snap-mandatory overflow-auto fixed left-0 right-0 bottom-0 overscroll-contain"
             style={{
                 // top: `${navigationHeight}px`,
                 paddingTop: `${navigationHeight}px`,
                 scrollPaddingTop: `${navigationHeight}px`
             }}>
            {children && children}
        </div>
    </>
}