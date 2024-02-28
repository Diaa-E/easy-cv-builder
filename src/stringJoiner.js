export function stringJoiner(stringAray, joiner)
{
    const filteredArray = stringAray.filter(item => item !== "");

    if (filteredArray.length === 0) return null;

    return filteredArray.join(joiner);
}