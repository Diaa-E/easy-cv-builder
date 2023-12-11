import fonts from "./fonts";
import layouts from "./layouts";

export function isBright(colorHex)
{
    //The following code is stolen from stack overflow, it calculates the current color's brightness
    const fontColor = colorHex.substring(1);
    const rgb = parseInt(fontColor, 16); 
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >>  8) & 0xff;  // extract green
    const b = (rgb >>  0) & 0xff;  // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    //theft ends here

    return (luma > 100);
}

export function testDraftValidity(draft)
{
    const dataIntegrity = [
        {
          name: "accentColor",
          valid: testColor(draft.accentColor),
        },
        {
            name: "font",
            valid: testFont(draft.font),
        },
        {
            name: "layout",
            valid: testLayout(draft.layout),
        }
      ];
  
      const errorLog = [];
  
      dataIntegrity.forEach(item => {
  
        if (!item.valid)
        {
          errorLog.push(item.name);
        }
      });

      return errorLog;
}

function testColor(hexColorString)
{
    return /^#[0-9A-F]{6}$/i.test(hexColorString);
}

function testFont(fontValue)
{
    return Boolean(fonts.find(font => font.value === fontValue));
}

function testLayout(layoutValue)
{
    return Boolean(layouts.find(layout => layout.value === layoutValue));
}