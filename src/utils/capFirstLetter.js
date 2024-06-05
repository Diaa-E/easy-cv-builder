export function capFirstLetter(string)
{
    let acc = "";

    for (let i = 0; i < string.length; i++)
    {
        if (string.charAt(i - 1) === " " || i === 0)
        {
            acc += string.charAt(i).toUpperCase();
        }
        else
        {
            acc += string.charAt(i);
        }
    }

    return acc;
}