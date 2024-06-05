export function calculateTextLevel(textLevels, value)
{
    if (isNaN(+value)) throw new Error("Invalid value:" + value + " is NaN");

    textLevels.sort((a, b) => +b.min - +a.min); //sort in descending order

    for (const level of textLevels)
    {
        if (+value >= level.min) return level.name;
    }

    throw new Error("Invalid value:" + value + "is smaller than the tamplate's lower bound " + textLevels.at(-1).min);
}