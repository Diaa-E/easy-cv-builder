# <img src="./src/assets/images/logo.svg" alt="Easy CV builder logo" width="30px"/> Easy CV Builder

## Contents

1. [Live Preview](#live-preview)
1. [Changes](#changes)
1. [Documentation](#documentation)

## Live Preview

 [Github Pages Deployment](https://diaa-e.github.io/easy-cv-builder/)

## Changes

[Change log file](./CHANGELOG.md)

## Documentation

### Contents

1. [Adding a new page component](#adding-a-new-page-component)
1. [Utility functions](#utility-functions)
-------

### Adding a new page component

1. Add a new unique tab key to the tabs object in ```./src/data/tabs.js``` file.
1. Each key must have a unique value as it is used to render the correct page in the ```<App/>``` component.
    ```js
        export const tabs = {
            tabKey: "uniqueTabTitle" //This string is used as a heading for the page's component.
        }
    ```
1. Create a page component file in ```./src/pages/``` directory, this component's tests should go in the ```./src/pages/__tests__/``` directory.
1. Add new page's SVG icon to ```./src/assets/images/``` directory.
1. Add icon path to app icons object in ```./src/data/appIconsBarrel.js```.
    ```js
    import newPageIcon from "../assets/images/newPageIcon.svg";

    export const appIcons = {
        newPage: newPageIcon
    }
    ```
1. Add a ```<NavItem />``` component to the ```<nav></nav>``` component in ```App.jsx``` 
    ```html
    <nav>
        <ul>
            <NavItem
                iconUrl={appIcons.newPage}
                title={tabs.newPage}
                selected={currentTab === tabs.newPage}
                onClick={() => setCurrentTab(tabs.newPage)}
            />
        </ul>
    </nav>
    ```
1. Each page component reuses other components which have their own CSS modules, other styles like containers exist in ```./src/styles/App.module.css```.
1. Any state used in the CV preview must be moved to the ```<App />``` component and passed down to the page component the state and its setter.
1. **(Optional)** screen width context. Screen width context contains the current viewport width ```window.innerWidth```, it can be used for conditional rendering based on screen width.
    ```js
    import ScreenWidthContext from "../App.jsx";

    ...

    function NewPage({})
    {
        const screenWidth = useContext(ScreenWidthContext).screenWidth;
    }
    ```
1. **(Optional)** Dialog context. Dialog context is used to open a confirm action dialog. It contains a dispatch function that accepts an action object with a type key and other options if required. The dialog closes on its own when the user clicks the cancel button, this is the default behaviour, no extra code is needed.
    ```js
    import DialogContext from "../App.jsx";

    ...

    export default function NewPage({})
    {
        const dispatchDialog = useContext(DialogContext);
    }
    ```

    ```js
    // Open a dialog box with a cancel button and a primary button set to accent color
    dispatchDialog({
        type: "openDefault",
        actionText: "confirmButtonText",
        prompt: "dialogDescription",
        onConfirm: function runOnConfirm() => {}
    });

    //OR

    // Open a dialog box with a cancel button and a primary button set to danger color
    dispatchDialog({
        type: "openDanger",
        actionText: "confirmButtonText",
        prompt: "dialogDescription",
        onConfirm: function runOnConfirm() => {}
    });
    ```
------

### Utility functions

1. #### toggleHide
    ```js
    import { toggleHide } from "./src/utils/arrayFunctions.js";

    toggleHide(targetId: "string", dataArray: []);
    ```
    Inverts target item's "hidden" boolean key.
    Returns a new array with the changes.

1. #### updateItems
    ```js
    import { updateItems } from "./src/utils/arrayFunctions.js";

    updateItems(newItem: {}, dataArray: []);
    ```
    Adds the ```newItem``` object to the end of the array if it does not already exist in the array (based on ID), if the item already exists, it is replaced with the ```newItem``` object.
    Returns a new array with the changes.

1. #### deleteItem
    ```js
    import { deleteItem } from "./src/utils/arrayFunctions.js";

    deleteItem(targetId: "string", dataArray: []);
    ```
    Removes an item from an array.
    Returns a new array with the changes.

1. #### moveItemUp
    ```js
    import { moveItemUp } from "./src/utils/arrayFunctions.js";

    moveItemUp(targetId: "string", dataArray: []);
    ```
    Moves an item up in the array (index - 1), if the item is already at index 0, the ```dataArray``` is returned unchanged.
    Returns a new array with the changes.

1. #### toggleHideSection
    ```js
    import { toggleHideSection } from "./src/utils/arrayFunctions.js";

    toggleHideSection(itemsArray: [], hide: Boolean);
    ```
    If the hide flag is true, each item in the array gets its "hidden" key set to true, if the hide flag is false, each item in the array gets its "hidden" key set to false.
    Returns a new array with the changes.

1. #### calculateTextLevel
    ```js
    import { calculateTextLevel } from "./src/utils/calculateTextLevel.js";

    calculateTextLevel(textLevels: [], value: number | "number string");
    ```
    Returns a matching verbal proficiency level from the textLevels array based on passed value. Text levels array must be an array of objects in the following format:
    ```js
    const textLevels = [
        {
            name: "pass",
            min: 50,
        },
        {
            name: "fail",
            min: 0
        }
    ];
    ```
    The min key is the minimum value (inclusive) for the value to match the same level.
    Text levels array must have at least 1 element up to any number of elements.
    Text Levels array does not have to be sorted in a specific order, the function already sorts it before matching a level. If the value cannot be converted into a number, the function throwws an error. If the value is smaller than the smallest min value in the text levels array, the function throws an error.

1. #### isEmptySection
    ```js
    import { isEmptySection } from "./src/utils/emptySectionDetector.js";

    isEmptySection(dataArray: []);
    ```
    Returns true if the array is empty or if all the elements in the array have their hidden key set to true.

1. #### fixDraft
    ```js
    import { fixDraft } from "./src/utils/fixDraft.js";

    fixDraft(draft: {}, invalidKeys: [], defaultTemplate: {});
    ```
    Fixes the invalid sections in a CV draft.
    Returns a mutated draft object with each key in the invalidKeys array set to the equivilant key from the defaultTemplate object.
------