'use client';

import { ReactElement, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Page(props: { children: any }) {
    const [mounted, setMounted] = useState<boolean>(false);

    const {loading} = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <div className={`${mounted && !loading ? "opacity-100 animate-fade-up" : "opacity-0"} transition-opacity duration-200 w-full h-full`}>
                {mounted && !loading ?
                    <>
                        {props.children}
                    </>
                    :
                    <></>
                }
            </div>
        </>
    )
}