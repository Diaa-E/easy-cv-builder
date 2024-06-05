export function highlightText(string, highlightToken)
{
    const stringChunks = [];
    let highlight = false;
    let acc = "";

    for (let i = 0; i < string.length; i++)
    {
        if (string.charAt(i) === highlightToken && highlight) //found a closing token
        {
            stringChunks.push({value: acc, highlight: true});
            highlight = false;
            acc = "";
        }
        else if (string.charAt(i) === highlightToken && !highlight) //found an opening token
        {
            if (i > 0) //don't push empty string when first character is a highlight token
            {
                stringChunks.push({value: acc, highlight: false})
            }
            highlight = true;
            acc = "";
        }
        else if (i === string.length - 1 && highlight) //last character and highlight is still open
        {
            throw new Error("String has an unclosed highlight area");
        }
        else if (i === string.length - 1 && !highlight) //last character and highlight is closed
        {
            acc += string.charAt(i); //push last character
            stringChunks.push({value: acc, highlight: false});
        }
        else //add regular chars to accumulator
        {
            acc += string.charAt(i);
        }
    }

    return stringChunks;
}