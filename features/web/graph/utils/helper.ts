export const constants = {
    nodeType: "NoteNode",
};

export function createAlternatingStepper(height: number) {
    let step = 0;
    let sign = 1;

    return function () {
        const value = sign * step;
        step += height;
        sign *= -1;
        return value;
    };
}

export function createCircleStepper(gap: number, totalPoints: number) {
    const circumference = gap * gap;
    const radius = circumference / (2 * Math.PI);

    let index = 0;

    return function () {
        const angle = (2 * Math.PI * index) / totalPoints;
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);
        index++;
        return [x, y];
    };
}
