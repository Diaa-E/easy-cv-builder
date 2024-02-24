# <img src="./src/assets/images/logo.svg" alt="Easy CV builder logo" width="30px"/> Easy CV Builder

## Change Log

This change log only highlights important changes (i.e features and refactors).

### **1.2.2 (Feb 24, 2024)**

- Fix hidden list item text color.
- Save dark mode preference to local storage.
- Use disctinct colors for dark mode button based on the mode it activates.
- Animate dark mode button on mode switch.
- Fix skill/language level bar not adjusting to screen width and casuing overflow

### **1.2.1 (Feb 23, 2024)**

- Fix CV preview text not adjusting with accent color's brightness.

### **1.2.0 (Feb 23, 2024)**

- Add dark mode option.
- Fix typo in sample info.
- Add more verifications for uploaded drafts.
- Move draft verification functions from utility to their own module.
- Write unit tests for low level components.

### **1.1.2 (Feb 6, 2024)**

- Fix hambruger menu sometimes not closing when user clicks outside it.
- Close harmburger menu on screen scroll.

### **1.1.1 (Feb 2, 2024)**

- List item controls can be now accessed through a hamburger menu on narrower screens to save space.

### **1.1.0 (Jan 29, 2024)**

- List items can now be moved up the list.
- Fix broken link icons.
- Fix a typo in sample data.
- Replace direct icon imports with import barrels.
- Remove unused code.

### **1.0.5 (Dec 15, 2023)**

- Display a text message when a list has no items.
- Reduce app logo size.
- Refactor: Use an early return for disabled lists.

### **1.0.4 (Dec 13, 2023)**

- Fix list item buttons shrinking when item text grows too long.
- Fix list item text overflowing.

### **1.0.3 (Dec 13, 2023)**

- Fix controls not scrolling down on some devices.
- List items can now be deleted without having to go to edit mode.
- Reduce list item buttons size for better space distribution.

### **1.0.2 (Dec 12, 2023)**

- Draft compatibility is validated based on structure not version number.
- Older version drafts can now be used in higher versions.

### **1.0.1 (Dec 11, 2023)**

- Draft JSONs created by older versions can no longer be used in higher versions.

### **1.0.0 (Dec 11, 2023)**

- First build
