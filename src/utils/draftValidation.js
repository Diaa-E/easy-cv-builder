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
        "order": (order) => testAppResource(order, orderModes),
        "font": (font) => testAppResource(font, fonts),
        "layout": (layout) => testAppResource(layout, layouts),
        "links": (links) => testArray(links, sampleInfo.links[0]),
        "skills": (skills) => testArray(skills, sampleInfo.skills[0]),
        "languages": (languages) => testArray(languages, sampleInfo.languages[0]),
        "education": (education) => testArray(education, sampleInfo.education[0]),
        "experience": (experience) => testArray(experience, sampleInfo.experience[0]),
        "personalInfo": (personalInfo) => testObject(personalInfo, sampleInfo.personalInfo),
        "contact": (contact) => testObject(contact, sampleInfo.contact),
        "levelMode": (levelMode) => testAppResource(levelMode, levelModes),
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

function testStringPattern(string, regexPattern)
{
    return regexPattern.test(string);
}

function testAppResource(sampleResource, targetResources)
{
    return targetResources.find(item => item.value === sampleResource);
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