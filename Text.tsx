import { ReactElement, useState } from "react";
import { useSpring, animated } from '@react-spring/web';

export function AnimatedLink(props: { children: any }) {
    const animationSettings = {
        from: {
            fontWeight: '400',
            scale: 1.0,
            y: 0,
        },
        to: {
            fontWeight: '800',
            scale: 1.05,
            y: -2,
        }
    }

    const [springs, api] = useSpring(() => ({
        from: { 
            fontWeight: animationSettings.from.fontWeight,
            scale: animationSettings.from.scale,
            y: animationSettings.from.y,
        },
        config: {
            mass: 2,
            friction: 500,
            tension: 120,
        }
    }));

    const onMouseEnter = () => {
        api.start({
            from: {
                fontWeight: animationSettings.from.fontWeight,
                scale: animationSettings.from.scale,
                y: animationSettings.from.y,
            },
            to: {
                fontWeight: animationSettings.to.fontWeight,
                scale: animationSettings.to.scale,
                y: animationSettings.to.y,
            },
        });
    }

    const onMouseLeave = () => {
        api.start({
            from: {
                fontWeight: animationSettings.to.fontWeight,
                scale: animationSettings.to.scale,
                y: animationSettings.to.y,
            },
            to: {
                fontWeight: animationSettings.from.fontWeight,
                scale: animationSettings.from.scale,
                y: animationSettings.from.y,
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
            className={"text-primary mr-4 hover:underline"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {props.children}
        </animated.span>
    )
}
