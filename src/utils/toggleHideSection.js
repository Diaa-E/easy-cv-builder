export function toggleHideSection(itemsArray, hide)
{
    const newArray = JSON.parse(JSON.stringify(itemsArray));

    newArray.forEach(item => {

        hide ? item.hidden = true : item.hidden = false;
    });

    return newArray;
}