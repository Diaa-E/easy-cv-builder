export function getStartCase(string)
{
    const words = string.split(" ");
    const capitalizedWords = [];

    for (const word of words)
    {
        if (Boolean(word)) 
        {
            capitalizedWords.push(word.at(0).toUpperCase() + word.substring(1));
        }
        else
        {
            capitalizedWords.push(word);
        }
    }
    

    return capitalizedWords.join(" ");
}