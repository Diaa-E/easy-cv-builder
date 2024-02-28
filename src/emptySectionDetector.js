export function isEmptySection(dataArray)
{
    if (dataArray.length === 0) return true;
    if (dataArray.findIndex(item => item.hidden === false) === -1) return true;

    return false;
}