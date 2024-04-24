import { deepCopy, getItemIndex } from "./utility";

export function toggleHide(targetId, dataArray)
{
    const newArray = deepCopy(dataArray);
    const hideTarget = getItemIndex(newArray, targetId);
    newArray[hideTarget].hidden = !newArray[hideTarget].hidden;

    return newArray;
}

export function updateItems(newItem, dataArray)
{
  const newArray = deepCopy(dataArray);
  const newItemIndex = getItemIndex(newArray, newItem.id);

  if (newItemIndex === -1)
  {
    newArray.push(newItem)
  }
  else
  {
    newArray[newItemIndex] = newItem;
  }

  return newArray;
}

export function deleteItem(targetId, dataArray)
{
  const newArray = dataArray.filter(item => item.id !== targetId);

  return newArray;
}

export function moveItemUp(targetId, dataArray)
{
  const targetIndex = getItemIndex(dataArray, targetId);
  
  if (targetIndex === 0) return Array.from(dataArray);
  const newArray = [];

  for (let i = 0; i < dataArray.length; i++)
  {
    if (i === targetIndex - 1)
    {
      newArray.push(dataArray[targetIndex]);
      newArray.push(dataArray[targetIndex-1]);
      i += 1; //skip both items - consider incremement at iteration end
      continue;
    }

    newArray.push(dataArray[i]);
  }

  return newArray;
}

export function toggleHideSection(itemsArray, hide)
{
    const newArray = JSON.parse(JSON.stringify(itemsArray));

    newArray.forEach(item => {

        hide ? item.hidden = true : item.hidden = false;
    });

    return newArray;
}