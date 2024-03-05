import { getItemIndex } from "./utility";

export function toggleHide(targetId, dataArray)
{
    const newArray = Array.from(dataArray);
    const hideTarget = getItemIndex(newArray, targetId);
    newArray[hideTarget].hidden = !newArray[hideTarget].hidden;

    return newArray;
}

export function updateItems(newItem, dataArray)
{
  const newArray = Array.from(dataArray);
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

export function deleteItem(targetItemId, dataArray)
{
  const newArray = dataArray.filter(item => item.id !== targetItemId);

  return newArray;
}

export function moveItemUp(targetId, dataArray)
{
  const targetIndex = getItemIndex(dataArray, targetId);
  
  if (targetIndex === 0) return;
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