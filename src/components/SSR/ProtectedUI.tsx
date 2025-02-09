import {ReactNode} from "react";

export default function ProtectedUI({children, fallbackElement, forceFallbackElement}: {
    fallbackElement?: ReactNode;
    forceFallbackElement?: boolean;
    children?: ReactNode;
}) {
    return <>
        {(process.env.NODE_ENV === "production") || (process.env.NODE_ENV === "development" && forceFallbackElement) ? (
            fallbackElement && fallbackElement
        ) : (
            children && children
        )}
    </>
}