export function calculateTextLevel(textLevels, value)
{
    textLevels.sort((a, b) => +b.min - +a.min); //sort in descending order

    for (const level of textLevels)
    {
        if (+value >= level.min) return level.name;
    }
}