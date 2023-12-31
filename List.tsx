import Link from "next/link";
import { randInt } from "three/src/math/MathUtils";
import { LinkType } from "./types";
import { AnimatedLink } from "./Text";
import { MouseEventHandler } from "react";
import { hash } from "./hash";
import { ArrowArcRight, ArrowBendDoubleUpRight, ArrowBendRightUp } from "phosphor-react";

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
            <ul className="flex flex-col px-4 self-start font-eb-garamond flex-wrap">
                {
                    props.items.map((link: LinkType) => (
                        <li
                            id={link.name}
                            key={hash(link.link)}
                            className=""
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
                                    <div className="flex flex-row">
                                        {link.name}
                                        {link.opensAnotherSite ?
                                            <>
                                                <ArrowBendRightUp weight="bold" className="w-full h-full text-primary" />
                                            </>
                                            :
                                            null
                                        }
                                        {link.openInNewTab ?
                                            <>
                                                <ArrowBendDoubleUpRight weight="bold" className="w-full h-full text-primary" />
                                            </>
                                            :
                                            null
                                        }
                                    </div>
                                </AnimatedLink>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}