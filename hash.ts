import { randInt } from "three/src/math/MathUtils";

export const hash = (str: string): number => {
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