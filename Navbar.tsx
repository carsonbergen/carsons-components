'use client';

import { useLanguage } from "@/components/carsons-components/LanguageProvider";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import Dropdown from "../Dropdown";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { locale, setLocale } = useLanguage();

    return (
        <>
            {mounted ?
                <>
                    <div className="fixed top-0 left-0 w-full h-12 text-primary flex justify-end items-center align-middle text-center px-4 z-[9999]">
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
                                            >
                                                {locale.name}
                                            </button>
                                        </>
                                    ))
                                }
                            </Dropdown>
                        </div>
                    </div>
                </>

                : <></>
            }
        </>
    )
}