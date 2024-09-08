# <img src="./src/assets/images/logo.svg" alt="Easy CV builder logo" width="30px"/> Easy CV Builder

## 📃 Contents

1. [Live Preview](#live-preview)
1. [Changes](#changes)
1. [Documentation](#documentation)

## 🖥️ Live Preview

 1. [Github Pages Deployment](https://diaa-e.github.io/easy-cv-builder/)

## 🪜 Changes 

1. [Change log file](./CHANGELOG.md)

## 📖 Documentation

1. [Adding a new page component](#adding-a-new-page-component)
1. [Utility functions](#utility-functions)
1. [Hooks](#hooks)
-------

### 🧩 Adding a new page component 

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
1. **(Optional)** screen width hook. This hook returns a state with the window's current width ```window.innerWidth```, it can be used for conditional rendering based on screen width.
    ```js
    import useScreenWidth from "../hooks/useScreenWidth.jsx";

    ...

    function NewPage({})
    {
        const screenWidth = useScreenWidth();
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

### 🛠️ Utility functions 

1. #### toggleHide
    ```js
    import { toggleHide } from "./src/utils/arrayFunctions.js";

    toggleHide(targetId: "string", dataArray: []): []
    ```
    Inverts target item's "hidden" boolean key.
    Returns a new array with the changes.

1. #### updateItems
    ```js
    import { updateItems } from "./src/utils/arrayFunctions.js";

    updateItems(newItem: {}, dataArray: []): []
    ```
    Adds the ```newItem``` object to the end of the array if it does not already exist in the array (based on ID), if the item already exists, it is replaced with the ```newItem``` object.
    Returns a new array with the changes.

1. #### deleteItem
    ```js
    import { deleteItem } from "./src/utils/arrayFunctions.js";

    deleteItem(targetId: "string", dataArray: []): []
    ```
    Removes an item from an array.
    Returns a new array with the changes.

1. #### moveItemUp
    ```js
    import { moveItemUp } from "./src/utils/arrayFunctions.js";

    moveItemUp(targetId: "string", dataArray: []): []
    ```
    Moves an item up in the array (index - 1), if the item is already at index 0, the ```dataArray``` is returned unchanged.
    Returns a new array with the changes.

1. #### toggleHideSection
    ```js
    import { toggleHideSection } from "./src/utils/arrayFunctions.js";

    toggleHideSection(itemsArray: [], hide: Boolean): []
    ```
    If the hide flag is true, each item in the array gets its "hidden" key set to true, if the hide flag is false, each item in the array gets its "hidden" key set to false.
    Returns a new array with the changes.

1. #### calculateTextLevel
    ```js
    import { calculateTextLevel } from "./src/utils/calculateTextLevel.js";

    calculateTextLevel(textLevels: [], value: number | "number string"): string
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

    isEmptySection(dataArray: []): boolean
    ```
    Returns true if the array is empty or if all the elements in the array have their hidden key set to true.

1. #### fixDraft
    ```js
    import { fixDraft } from "./src/utils/fixDraft.js";

    fixDraft(draft: {}, invalidKeys: [], defaultTemplate: {}): {}
    ```
    Fixes the invalid sections in a CV draft.
    Returns a mutated draft object with each key in the invalidKeys array set to the equivilant key from the defaultTemplate object.

1. #### highlightText
    ```js
    import { highlightText } from "./src/utils/highlightText.js";

    highlightText(string: "string", highlightToken: "string"): []
    ```
    Highlights each part of the string enclosed between a pair of highlight tokens as shown in the following example:
    ```js
    highlightText("this is some *marked text*", "*"); //highlights the substring "marked text", all "*" are removed.
    ```
    Returns an array objects, each object contains a chunk of the original string with a boolean highlight flag.
    ```js
    //return value
    [
        {
            value: "this is some ",
            highlight: false
        },
        {
            value: "marked text",
            highlight: true,
        }
    ]
    ```

1. #### capFirstLetter
    ```js
    import { capFirstLetter } from ".src/utils/capFirstLetter.js";

    capFirstLetter(string: "string"): string
    ```
    Capitalizes the first letter of each word seperated by a white space. Returns a new string with changes.

1. #### joinString
    ```js
    import { joinString } from ".src/utils/stringJoiner.js";

    joinString(stringArray: [], joiner: "string"): string
    ```
    A more advanced string joining function, it ignores empty strings and empty arrays. Returns a string consisting of the array's elements joined by the joiner string while ignoring empty strings in the array. Returns null if the array has no elements (to disable rendering in React component).

1. #### testDraftValidity
    ```js
    import { testDraftValidity } from ".src/utils/draftValidation.js";

    testDraftValidity(draft: {}): []
    ```
    Tests each section of the draft for invalid data types or values using other utility functions each for a specific test case. Returns an array containing the names of the faulty sections.

1. #### testStringPattern
    ```js
    import { testStringPattern } from ".src/utils/draftValidation.js";

    testStringPattern(string: "string", regexPattern: regex): boolean
    ```
    Tests a string using a regex pattern. Returns true if the string matches, false otherwise.

1. #### testAppResource
    ```js
    import { testAppResource } from ".src/utils/draftValidation.js";

    testAppResource(sampleResource: {}, targetResource: {}, targetProperty: "string"): boolean
    ```
    Tests app resources used in the draft like icons or fonts. Returns true if the target property in the sample resource matches its counterpart in the target resource, otherwise it returns false.

1. #### testObject
    ```js
    import { testObject } from ".src/utils/draftValidation.js";

    testObject(sampleObject: {}, targetObject: {}): boolean
    ```
    Tests a sample object for any missing properties or different property types from that of the target object. Returns false if there is a property or more missing or if a property's type is not matching its counterpart in the target object, otherwise returns true.

1. #### testArray
    ```js
    import { testArray } from ".src/utils/draftValidation.js";

    testArray(sampleArray: [], targetObject: {}): boolean
    ```
    Tests every object in the array for missing properties or different property type from that of the target object. Returns false if one or more objects in the array have missing properties or type mismatch, otherwise returns true.

1. #### testLevel
    ```js
    import { testLevel } from ".src/utils/draftValidation.js";

    testLevel(level: number, min: number, max: number, increment: number): boolean
    ```
    Tests if the level is smaller than the max, bigger than the min and divisible by the increment. Returns true if all previous conditions are met, returns false if one or more are not met.

1. #### tryParseJSON
    ```js
    import { tryParseJSON } from ".src/utils/draftValidation.js";

    tryParseJSON(JSONString: Serialized JSON): {} | boolean
    ```
    Tests a JSON string's validity. Returns false if the parsing throws an error, returns the parsed object if the parsing is successful.
------

### 🪝 Hooks 

1. #### useScreenWidth
    ```js
    import useScreenWidth from "./src/hooks/useScreenWidth.jsx";

    useScreenWidth(): number
    ```

    Adds a resize event listener to the window and returns a state with the window's current inner width.

1. #### useToggleScroll
    ```js
    import useToggleScroll from "./src/hooks/useToggleScroll.jsx";

    useToggleScroll(lock: boolean): undefined;
    ```

    Takes a boolean lock argument and locks the document's body scroll if it is true and unlocks it if it is false. The lock argument is ideally a reactive state.

1. #### useUnmountDelay
    ```js
    import useUnmountDelay from "./src/hooks/useUnmountDelay.jsx";

    useUnmountDelay(unmountDelayMS: number): [mounted: boolean, mount: (mountCallback: () => {}) => {}, unmount: (unmountCallback: () => {}) => {}];
    ```

    Delays component unmount for a set time to run an unmount animation. Takes a number argument for delay time in millisceonds. Returns an array containing a boolean flag for current mount state, a mount function that takes a callback as an argument and an unmount function that takes a callback as an argument.

    The initial value of the mounted variable is ```true``` since components in this project are unmounted by the parent.
    The mount function sets the mounted state to true then calls the passed callback. The unmount function sets the mounted state to false and calls the passed callback after the specified time in the delay argument has passed.

    Example:
    ```js
    const [mounted, mount, unmount] = useUnmountDelay(500);

    return (
        <button
            classname=`${mounted ? "mount-animation" : "unmount-animation"}`
            onClick={() => unmount(() => {})}
        >
            click to unmount
        </button>
    )
    ```
-------