// MUST BE SYNCED WITH CLOUD FUNCTION
export const getCorrectYear = () => {
    const switchOverDate = new Date();

    switchOverDate.setMonth(7); // August
    switchOverDate.setDate(1); // 1st August
    switchOverDate.setHours(1);

    const newDate = new Date();

    if (newDate > switchOverDate) {
        return String(newDate.getFullYear());
    }
    return String(newDate.getFullYear() - 1);

    // // 07 = August -> Once we reach August, start serving the next year
    // // This means that at the beginning of August, we must convert over the previous year

    // // If we are January 2022, then the season started in 2021, so we return 2021
};
