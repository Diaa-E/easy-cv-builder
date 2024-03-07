export function highlightText(string, highlightToken)
{
    let tokenInstances = 0;

    for (let i = 0; i < string.length; i++)
    {
        if (string.charAt(i) === highlightToken) tokenInstances++;
    }

    if (tokenInstances % 2 !== 0) throw new Error("String has an unclosed mark");

    const splitString = string.split(highlightToken);
    const finalArray = [];

    for (let i = 0; i < splitString.length; i++)
    {
        if (splitString[i] === "")
        {
            continue;
        }
        else if (i % 2 === 0)
        {
            finalArray.push({value: splitString[i], highlight: false});
        }
        else
        {
            finalArray.push({value: splitString[i], highlight: true});
        }
    }

    return finalArray;
}