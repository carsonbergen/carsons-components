'use client';

import { useLanguage } from "@/components/carsons-components/LanguageProvider";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { hash } from "./hash";

const locales = [
    {
        name: 'en',
    },
    {
        name: 'es',
    },
    {
        name: 'ru',
    }
]

export default function Navbar() {
    const [mounted, setMounted] = useState<boolean>(false);

    const { locale, setLocale } = useLanguage();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {mounted ?
                <div className="fixed top-0 left-0 w-full h-12 text-primary flex justify-end items-center align-middle text-center px-4 z-[9999] font-eb-garamond text-lg">
                    <div className="flex flex-col">
                        <Dropdown
                            title={`${locale}`}
                        >
                            {
                                locales.map(locale => (
                                    <>
                                        <button
                                            onClick={() => {
                                                setLocale(locale.name);
                                                localStorage.setItem('locale', locale.name);
                                            }}
                                            key={hash(locale.name)}
                                        >
                                            {locale.name}
                                        </button>
                                    </>
                                ))
                            }
                        </Dropdown>
                    </div>
                </div>
                : null
            }
        </>
    )
}