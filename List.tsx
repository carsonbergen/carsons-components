import Link from "next/link";
import { randInt } from "three/src/math/MathUtils";
import { LinkType } from "./types";
import { AnimatedLink } from "./Text";
import { MouseEventHandler } from "react";
import { hash } from "./hash";

// List of links
export function LinkList(
    props: { 
        items: LinkType[], 
        openInNewTab?: boolean, 
        onMouseEnter: MouseEventHandler<HTMLAnchorElement>,
        onMouseLeave: MouseEventHandler<HTMLAnchorElement>,
}) {
    return (
        <>
            <ul className="flex flex-row self-start font-eb-garamond flex-wrap">
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