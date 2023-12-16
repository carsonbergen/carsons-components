'use client';

import { ReactElement, useEffect, useState } from "react";

export default function Page(props: { children: any }) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <div className={`${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
                {mounted ?
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