import { ReactElement, useState } from "react";
import { useSpring, animated } from '@react-spring/web';

export function AnimatedLink(props: { children: any }) {
    const animationSettings = {
        from: {
            fontWeight: '400',
            transform: "scale(1.0)",
            y: 0,
            marginLeft: 4,
            marginRight: 4,
        },
        to: {
            fontWeight: '800',
            transform: "scale(1.05)",
            y: -1,
            marginLeft: 4,
            marginRight: 4,
        }
    }

    const [springs, api] = useSpring(() => ({
        from: { 
            fontWeight: animationSettings.from.fontWeight,
            transform: animationSettings.from.transform,
            y: animationSettings.from.y,
            marginLeft: animationSettings.from.marginLeft,
            marginRight: animationSettings.from.marginRight,
        },
        config: {
            mass: 2000,
            friction: 500,
            tension: 20,
        }
    }));

    const onMouseEnter = () => {
        api.start({
            from: {
                fontWeight: animationSettings.from.fontWeight,
                transform: animationSettings.from.transform,
                y: animationSettings.from.y,
                marginLeft: animationSettings.from.marginLeft,
                marginRight: animationSettings.from.marginRight,
            },
            to: {
                fontWeight: animationSettings.to.fontWeight,
                transform: animationSettings.to.transform,
                y: animationSettings.to.y,
                marginLeft: animationSettings.to.marginLeft,
                marginRight: animationSettings.to.marginRight,
            },
        });
    }

    const onMouseLeave = () => {
        api.start({
            from: {
                fontWeight: animationSettings.to.fontWeight,
                transform: animationSettings.to.transform,
                y: animationSettings.to.y,
                marginLeft: animationSettings.to.marginLeft,
                marginRight: animationSettings.to.marginRight,
            },
            to: {
                fontWeight: animationSettings.from.fontWeight,
                transform: animationSettings.from.transform,
                y: animationSettings.from.y,
                marginLeft: animationSettings.from.marginLeft,
                marginRight: animationSettings.from.marginRight,
            },
        });
    }

    return (
        <animated.span
            style={{
                display: "inline-block",
                verticalAlign: "middle",
                ...springs
            }}
            className={"text-primary mr-4 hover:underline flex-none flex-shrink"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {props.children}
        </animated.span>
    )
}
