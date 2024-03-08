export function toggleHideSection(itemsArray, hide)
{
    const newArray = Array.from(itemsArray);

    newArray.forEach(item => {

        hide ? item.hidden = true : item.hidden = false;
    });

    return newArray;
}