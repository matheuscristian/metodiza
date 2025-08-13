export function makeDaysList(
    totalDays: number,
    {
        prefix = [],
        suffix = true,
    }: {
        prefix?: number[];
        suffix?: boolean;
    } = {},
) {
    if (totalDays + prefix.length - 35 > 0) {
        throw new Error("More days than expected received");
    }

    let suffixArr: number[] = [];

    if (suffix) {
        suffixArr = [...Array(35 - totalDays + prefix.length).keys()].map(
            (i) => -Math.abs(i + 1),
        );
    }

    const days = [
        prefix.map((i) => -Math.abs(i)),
        [...Array(totalDays).keys()].map((i) => i + 1),
        suffixArr,
    ].flatMap((i) => (Array.isArray(i) ? i : [i]));

    return days;
}