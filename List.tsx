import Link from "next/link";
import { randInt } from "three/src/math/MathUtils";
import { LinkType } from "./types";
import { AnimatedLink } from "./Text";
import { MouseEventHandler } from "react";

// List of links
export function LinkList(
    props: { 
        items: LinkType[], 
        openInNewTab?: boolean, 
        onMouseEnter: MouseEventHandler<HTMLAnchorElement>,
        onMouseLeave: MouseEventHandler<HTMLAnchorElement>,
}) {
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
            <ul className="flex flex-row self-start font-eb-garamond pt-2 flex-wrap">
                {
                    props.items.map((link: LinkType) => (
                        <li
                            id={link.name}
                            key={hash(link.link)}
                        >
                            <Link
                                href={link.link}
                                target={`${props.openInNewTab ? "_blank" : ''}`}
                                rel={`${props.openInNewTab ? "noopener noreferrer" : ''}`}
                                onMouseEnter={props.onMouseEnter}
                                onMouseLeave={props.onMouseLeave}
                                className="lg:text-base text-xl"
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