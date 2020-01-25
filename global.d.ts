declare module '*.png';

declare module '*.css' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const classNames: any;

    export default classNames;
}
