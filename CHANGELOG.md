# <img src="./src/assets/images/logo.svg" alt="Easy CV builder logo" width="30px"/> Easy CV Builder

## Change Log

This change log only highlights important changes.

- ➕ : New feature
- 🛠️ : Fix
- ⚙️ : Code change with no impact on the user experience.

### **1.5.5 (30 Apr, 2024)**

- 🛠️ Improved upload draft button accessibility.
- 🛠️ Improved item controls buttons accessibility.
- 🛠️ Improved clear text field button accessibility.
- ⚙️ Moved CV order and level modes templates to their own modules.

### **1.5.4 (Apr 24, 2024)**

- 🛠️ Fixed Uploading draft crash.

### **1.5.3 (Apr 24, 2024)**

- ➕ Removed "move item up" button from first item in a list.
- ➕ Added animation to dialog box.
- 🛠️ Fixed typos in delete all item dialog.
- 🛠️ Fixed dialog closing when user clicks inside the dialog box instead of only when cancel or backdrop button is clicked
- ⚙️ Dialog reducers are now passed through a context instead of prop drilling.
- ⚙️ Replaced dialog state setters with reducers.
- ⚙️ Moved dialog call one layer deeper for future animation purposes (callback delay).
- ⚙️ User data made of lists now use reducers for state updates to reduce complexity.
- ⚙️ Update Node modules to the latest version.

### **1.5.2 (Apr 21, 2024)**

- ⚙️ Fixed typo in settings tab.

### **1.5.1 (Apr 20, 2024)**

- 🛠️ Fixed CV preview not filling A4 page height.

### **1.5.0 (Apr 20, 2024)**

- ➕ CV preview is now affected by zoom.
- 🛠️ List item text is now cropped when it grows bigger than available space. Cropped text can be read by either entering into edit mode or hover over text.
- 🛠️ Fixed multiple accessibility issues.
- ⚙️ Switched to CSS modules.
- ⚙️ Unit tests are now more focused on functionality.

### **1.4.1 (Mar 13, 2024)**

- 🛠️ Fix modern layout (layout_02) showing "native" for maxed out skill items. 

### **1.4.0 (Mar 13, 2024)**

- ➕ User can now choose text rating for skills and languages (i.e strong vs. familiar)
- ➕ Level slider now displays level value based on proficiency level mode.
- ➕ Invalid drafts can now be fixed by replacing invalid sections with default values.
- ➕ Tab buttons are now smaller so the user does not need to scroll to reach some tabs.
- ➕ External links now open in a new tab.
- ➕ Add "delete all" and "hide/show all" buttons to all list sections.
- ➕ Education and Experience sections' order can now be swapped (i.e education then experience or experience then education)
- 🛠️ Tab buttons no longer have distorted/broken borders when in focus.
- 🛠️ CV preview in mobile view is now centered instead of being shifted to the left.
- 🛠️ Fix list items controls and text overflowing when zooming into page.
- 🛠️ Fix navigation tabs tooltips showing current active tab instead of the title of the tab it activates.
- 🛠️ Fix modern layout (layout_02) not changing fonts.
- ⚙️ Reset accent color, font and layout using sample info values instead of hardcoded ones.
- ⚙️ Reduce number of props passed to language and skill list item component.

### **1.3.4 (Mar 7, 2024)**

- ➕ Critical information in the confirm action dialog is now highlighted in red.
- 🛠️ Contact and personal information that are left empty are now removed from the preview.
- 🛠️ Move contact info tab higher up the navigation bar.
- 🛠️ Fix double question mark in confirm message prompt.
- ⚙️ Refactor navigation tabs and pages to completely unmount inactive pages instead of returning an empty fragment while maintaining child's states.
- ⚙️ Move sample info file to correct folder.

### **1.3.3 (Mar 6, 2024)**

- 🛠️ Fix warning dialog backdrop resizing visibly on narrow screens when scrolling due to dynamic viewport height.
- 🛠️ Fix main controls buttons stack on the left side.
- 🛠️ Fix performance hit when resizing screen due to duplicating event listeners.
- ⚙️ Reduce amount of functions passed to each section.
- ⚙️ Restructure src folder hierarchy for easier navigation.

### **1.3.2 (Mar 3, 2024)**

- ➕ Show a confirm message before deleting/reseting data.
- ➕ Add a website category to link types.
- ➕ Auto-capitalize the start of each word in the full name field as the user types.
- 🛠️ Fix mobile display styles appearing on some wide screens.
- 🛠️ Fix textbox losing focus after clicking clear field button. This is most visible on mobile devices as it closes the keypad when the textbox loses focus.

### **1.3.1 (Mar 1, 2024)**

- ➕ Empty sections or sections full with hidden items will now be removed from CV preview.
- ➕ Add focus effect to clear field button.
- ➕ Add a link to the change log in the About section.
- ➕ Improve space management of skill items and language items in the simple layout (layout_01).
- 🛠️ Fix CV preview shrinking to the center of the page instead of sticking to the top on narrower screens.
- 🛠️ Fix page overflow in print/export mode.
- ⚙️ Add reusable function to detect empty CV sections.

### **1.3.0 (Feb 26, 2024)**

- ➕ Hovering over buttons now shows a tool tip.
- ➕ Edit/Add item form submit button text now reflects form's prupose.
- ➕ Add a clear field button to text boxes.
- ➕ New list items can now be added through a form instead of adding a placeholder item.
- ➕ Reloading page no longer resets draft's data.
- 🛠️ Fix List item text not wrapping and causing buttons to overflow.
- 🛠️ Fix edit/add item forms accessibility issues.
- ⚙️ Simplified personal info and contact components state setters.
- ⚙️ Add accent color, font and layout to sample info object.
- ⚙️ Merge list items return statements to avoid duplicating common code.
- ⚙️ Remove empty item templates.

### **1.2.3 (Feb 25, 2024)**

- ➕ Dark mode button now shows current active theme instead of the one it activates on the next click.
- 🛠️ Improve skill/language level bar accessibility.
- 🛠️ Fix some link icons' color not being completely black/white.
- 🛠️ Fix empty list text using the wrong font color.

### **1.2.2 (Feb 24, 2024)**

- ➕ Save dark mode preference to local storage.
- ➕ Use disctinct colors for dark mode button based on the mode it activates.
- ➕ Animate dark mode button on mode switch.
- 🛠️ Fix hidden list item text color.
- 🛠️ Fix skill/language level bar not adjusting to screen width and casuing overflow

### **1.2.1 (Feb 23, 2024)**

- 🛠️ Fix CV preview text not adjusting with accent color's brightness.

### **1.2.0 (Feb 23, 2024)**

- ➕ Add dark mode option.
- ➕ Add more verifications for uploaded drafts.
- 🛠️ Fix typo in sample info.
- ⚙️ Move draft verification functions from utility to their own module.
- ⚙️ Write unit tests for low level components.

### **1.1.2 (Feb 6, 2024)**

- ➕ Close harmburger menu on screen scroll.
- 🛠️ Fix hambruger menu sometimes not closing when user clicks outside it.

### **1.1.1 (Feb 2, 2024)**

- ➕ List item controls can be now accessed through a hamburger menu on narrower screens to save space.

### **1.1.0 (Jan 29, 2024)**

- ➕ List items can now be moved up the list.
- 🛠️ Fix broken link icons.
- 🛠️ Fix a typo in sample data.
- ⚙️ Replace direct icon imports with import barrels.
- ⚙️ Remove unused code.

### **1.0.5 (Dec 15, 2023)**

- ➕ Display a text message when a list has no items.
- 🛠️ Reduce app logo size.
- ⚙️ Use an early return for disabled lists.

### **1.0.4 (Dec 13, 2023)**

- 🛠️ Fix list item buttons shrinking when item text grows too long.
- 🛠️ Fix list item text overflowing.

### **1.0.3 (Dec 13, 2023)**

- ➕ List items can now be deleted without having to go to edit mode.
- 🛠️ Reduce list item buttons size for better space distribution.
- 🛠️ Fix controls not scrolling down on some devices.

### **1.0.2 (Dec 12, 2023)**

- ➕ Draft compatibility is validated based on structure not version number.
- ➕ Older version drafts can now be used in higher versions.

### **1.0.1 (Dec 11, 2023)**

- ➕ Draft JSONs created by older versions can no longer be used in higher versions.

### **1.0.0 (Dec 11, 2023)**

- 🚀 First build
