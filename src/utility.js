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

export function testColor(hexColorString)
{
    return /^#[0-9A-F]{6}$/i.test(hexColorString);
}