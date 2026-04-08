export const getDaysAgoFromISO = (iso: string) => {
    // convert ISO string and current date to objects
    const input = new Date(iso);
    const now = new Date();

    // find difference between input and current time
    const diffMilliseconds = now.getTime() - input.getTime();
    const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    return `${diffDays}d ago`;
};
