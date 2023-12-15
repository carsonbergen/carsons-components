import Link from "next/link";
import { randInt } from "three/src/math/MathUtils";
import { LinkType } from "./types";

// List of links
export function LinkList(props: { items: LinkType[], openInNewTab?: boolean }) {
    const hash = (str: string): number => {
        let code = 0;
        if (str.length === 0) {
            return code;
        }
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            code = code + char + randInt(0, str.length);
            // Convert to 32-bit integer
            code |= 0;
        }
        return Math.abs(code);
    }
    
    return (
        <>
            <ul className="flex flex-row font-eb-garamond">
                {
                    props.items.map((link: LinkType) => (
                        <li
                            id={link.name}
                            key={hash(link.link)}
                        >
                            <Link
                                href={link.link}
                                target={`${props.openInNewTab ? "_blank" : null}`}
                                rel={`${props.openInNewTab ? "noopener noreferrer" : null}`}
                                className="text-primary pr-2"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}