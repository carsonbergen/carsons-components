'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Context

interface LanguageData {
    locale: string;
    setLocale: (newLocale: string) => void;
    translations: Record<string, string>;
    loadTranslations: (locale: string) => void;
    loading: boolean;
}

const LanguageContext = createContext<LanguageData | undefined>(undefined);

const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider component");
    }

    return context;
}

// Provider

interface LanguageProviderProps {
    children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const storedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
    const initialLocale = storedLocale || 'en';

    const [locale, setLocale] = useState<string>(initialLocale);
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);

    const loadTranslations = async (newLocale: string) => {
        try {
            const response = await fetch(`/locales/${newLocale}.json`);
            const data = await response.json();

            setTranslations(data);
            setLocale(newLocale);

            if (typeof window !== 'undefined') {
                localStorage.setItem('locale', newLocale);
            }
        } catch (error) {
            console.error(`Error loading translation for the local "${newLocale}.json"`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTranslations(locale);
    }, [locale]);

    const languageData: LanguageData = {
        locale,
        setLocale,
        translations,
        loadTranslations,
        loading
    };

    return <LanguageContext.Provider value={languageData}>{children}</LanguageContext.Provider>
}

export { LanguageProvider, useLanguage }