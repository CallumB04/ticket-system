export const capitalize = (input: string): string => {
    return input.length <= 1
        ? input.toUpperCase()
        : input[0].toUpperCase() + input.slice(1);
};
