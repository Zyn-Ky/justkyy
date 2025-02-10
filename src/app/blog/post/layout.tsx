import React, {Suspense} from "react";
import BetterCircularProgress from "@/components/BetterCircularProgress";

export default function PostLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Suspense fallback={<>
            <BetterCircularProgress/>
        </>}>
            {children && children}
        </Suspense>
    </>
}