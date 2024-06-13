import fonts from "../data/fonts";
import layouts from "../data/layouts";
import linkIcons from "../data/linkIconsBarrel";
import sampleInfo from "../data/sampleInfo";
import orderModes from "../data/orderModes";
import levelModes from "../data/levelModes";

export function testDraftValidity(draft)
{
    const validators = {
        "accentColor": (color) => testStringPattern(color, /^#[0-9A-F]{6}$/i),
        "order": (order) => testAppResource(order, orderModes, "value"),
        "font": (font) => testAppResource(font, fonts, "value"),
        "layout": (layout) => testAppResource(layout, layouts, "value"),
        "links": (links) => {
            return (
                testArray(links, sampleInfo.links[0]) &&
                !links.find(link => !testAppResource(link.icon, linkIcons, "name")) //If a single link icon is invalid
            );
        },
        "skills": (skills) => {
            return (
                testArray(skills, sampleInfo.skills[0]) &&
                testArrayLevels(skills, 20, 100, 20)
            );
        },
        "languages": (languages) => {
            return (
                testArray(languages, sampleInfo.languages[0]) &&
                testArrayLevels(languages, 20, 100, 20)
            );
        },
        "education": (education) => testArray(education, sampleInfo.education[0]),
        "experience": (experience) => testArray(experience, sampleInfo.experience[0]),
        "personalInfo": (personalInfo) => testObject(personalInfo, sampleInfo.personalInfo),
        "contact": (contact) => testObject(contact, sampleInfo.contact),
        "levelMode": (levelMode) => testAppResource(levelMode, levelModes, "value"),
    };

    const dataIntegrity = [];

    for (const property in sampleInfo)
    {
        if (!draft?.hasOwnProperty(property))
        {
            dataIntegrity.push(
                {
                    name: property,
                    valid: false,
                }
            );
        }
        else if (typeof draft[property] !== typeof sampleInfo[property])
        {
            dataIntegrity.push(
                {
                    name: property,
                    valid: false,
                }
            );
        }
        else
        {
            dataIntegrity.push(
                {
                    name: property,
                    valid: validators[property](draft[property]),
                }
            );
        }
    }
  
      const errorLog = [];
  
      dataIntegrity.forEach(item => {
  
        if (!item.valid)
        {
          errorLog.push(item.name);
        }
      });

      return errorLog;
}

export function testArrayLevels(sampleArray, min, max, increment)
{
    return !sampleArray.find(item => !testLevel(item.level, min, max, increment));
}

export function testLevel(level, min, max, increment)
{
    return !(level % increment !== 0 || level < min || level > max);
}

export function testStringPattern(string, regexPattern)
{
    return regexPattern.test(string);
}

export function testAppResource(sampleResource, targetResources, targetProperty)
{
    return targetResources.find(item => item[targetProperty] === sampleResource);
}

export function testObject(sampleObject, targetObject)
{
    for (const property in targetObject)
    {
        if (!sampleObject?.hasOwnProperty(property))
        {
            return false;
        }
        else if (typeof sampleObject[property] !== typeof targetObject[property])
        {
            return false;
        }
    }

    return true;
}

export function testArray(sampleArray, targetObject)
{
    for (const item of sampleArray)
    {
        if (!testObject(item, targetObject))
        {
            return false;
        }
    }

    return true;
}

export function tryParseJSON(JSONString)
{
    try
    {
        const JSONObject = JSON.parse(JSONString);
        return JSONObject;
    }
    catch (error)
    {
        return false;
    }
}