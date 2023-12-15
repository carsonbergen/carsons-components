import Link from "next/link";
import { randInt } from "three/src/math/MathUtils";
import { LinkType } from "./types";
import { AnimatedLink } from "./Text";

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
            code |= 0;
        }
        return Math.abs(code);
    }

    return (
        <>
            <ul className="flex flex-row self-start font-eb-garamond pt-2">
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
                            >
                                {/* {link.name} */}
                                <AnimatedLink>
                                    {link.name}
                                </AnimatedLink>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}