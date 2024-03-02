export function getStartCase(string)
{
    const words = string.split(" ");
    const capitalizedWords = [];

    for (const word of words)
    {
        if (!Boolean(word)) continue;
        capitalizedWords.push(word.at(0).toUpperCase() + word.substring(1));
    }
    

    return capitalizedWords.join(" ");
}