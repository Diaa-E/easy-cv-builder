import fonts from "../data/fonts";
import layouts from "../data/layouts";
import linkIcons from "../data/linkIconsBarrel";
import sampleInfo from "../data/sampleInfo";

export function testDraftValidity(draft)
{
    const validators = {
        "accentColor": (color) => testColor(color),
        "order": (order) => testOrder(order),
        "font": (font) => testFont(font),
        "layout": (layout) => testLayout(layout),
        "links": (links) => testLinks(links),
        "skills": (skills) => testSkills(skills),
        "languages": (languages) => testLanguages(languages),
        "education": (education) => testEducation(education),
        "experience": (experience) => testExperience(experience),
        "personalInfo": (personalInfo) => testPersonalInfo(personalInfo),
        "contact": (contact) => testContact(contact),
        "levelMode": (levelMode) => testLevelMode(levelMode),
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

export function testLevelMode(levelMode)
{
    if (levelMode !== "bar" && levelMode !== "text") return false;

    return true;
}

export function testOrder(order)
{
    if (order !== "educationFirst" && order !== "experienceFirst") return false;

    return true;
}

export function testExperience(experienceArray)
{
    if (!Array.isArray(experienceArray)) return false;

    for (const experience of experienceArray)
    {
        if (!(experience instanceof Object)) return false;
    }

    const keys = [
        "id",
        "company",
        "location",
        "position",
        "start",
        "end",
        "details",
        "hidden",
    ];

    for (const experience of experienceArray)
    {
        if (!testObjectKeys(experience, keys)) return false;
    }

    const previousIds = [];

    for (const experience of experienceArray)
    {
        if (typeof experience.hidden !== "boolean")
        {
            return false;
        }
        else if (previousIds.find(id => id === experience.id))
        {
            return false;
        }

        previousIds.push(experience.id);
    }

    return true;
}

export function testEducation(educationArray)
{
    if (!Array.isArray(educationArray)) return false;

    for (const education of educationArray)
    {
        if (!(education instanceof Object)) return false;
    }

    const keys = [
        "id",
        "degree",
        "school",
        "location",
        "start",
        "end",
        "hidden"
    ];

    for (const education of educationArray)
    {
        if (!testObjectKeys(education, keys)) return false;
    }

    const previousIds = [];
    
    for (const education of educationArray)
    {
        if (typeof education.hidden !== "boolean")
        {
            return false;
        }
        else if (previousIds.find(id => id === education.id))
        {
            return false;
        }

        previousIds.push(education.id);
    }

    return true;
}

export function testLanguages(languagesArray)
{
    if (!Array.isArray(languagesArray)) return false;

    for (const language of languagesArray)
    {
        if (!(language instanceof Object)) return false;
    }

    const keys = [
        "id",
        "name",
        "level",
        "hidden",
        "showLevel",
    ];

    for (const language of languagesArray)
    {
        if (!testObjectKeys(language, keys)) return false;
    }

    const previousIds = [];

    for (const language of languagesArray)
    {
        //invalid level values
        if (typeof language.level !== "number")
        {
            return false;
        }
        else if (!(+language.level % 20 === 0 && +language.level > 0 && +language.level <= 100))
        {
            return false;
        }
        //non-boolean values
        else if (typeof language.hidden !== "boolean")
        {
            return false;
        }
        else if (typeof language.showLevel !== "boolean")
        {
            return false;
        }
        //repeating IDs
        else if (previousIds.find(id => id === language.id))
        {
            return false;
        }

        previousIds.push(language.id);
    }

    return true;
}

export function testSkills(skillsArray)
{
    if (!Array.isArray(skillsArray)) return false;

    for (const skill of skillsArray)
    {
        if (!(skill instanceof Object)) return false;
    }

    const keys = [
        "id",
        "name",
        "level",
        "hidden",
        "showLevel",
    ];

    for (const skill of skillsArray)
    {
        if (!testObjectKeys(skill, keys)) return false;
    }

    const previousIds = [];

    for (const skill of skillsArray)
    {
        //invalid level values
        if (typeof skill.level !== "number")
        {
            return false;
        }
        else if (!(+skill.level % 20 === 0 && +skill.level > 0 && +skill.level <= 100))
        {
            return false;
        }
        //non-boolean values
        else if (typeof skill.hidden !== "boolean")
        {
            return false;
        }
        else if (typeof skill.showLevel !== "boolean")
        {
            return false;
        }
        //repeating IDs
        else if (previousIds.find(id => id === skill.id))
        {
            return false;
        }

        previousIds.push(skill.id);
    }

    return true;
}

export function testLinks(linksArray)
{
    if (!Array.isArray(linksArray)) return false;

    for (const link of linksArray)
    {
        if (!(link instanceof Object)) return false;
    }

    const keys = [
        "id",
        "url",
        "icon",
        "hidden",
    ];

    for (const link of linksArray)
    {
        if (!testObjectKeys(link, keys)) return false;
    }

    const previousIds = [];

    for (const link of linksArray)
    {
        if (!Boolean(linkIcons.find(icon => link.icon === icon.name)))
        {
            return false;
        }
        else if (typeof link.hidden !== "boolean")
        {
            return false;
        }
        else if (previousIds.find(id => id === link.id))
        {
            return false;
        }

        previousIds.push(link.id);
    }

    return true;
}

export function testPersonalInfo(personalInfo)
{
    if (!(personalInfo instanceof Object)) return false;

    const keys = [
        "fullName",
        "profession",
        "address",
        "zip",
    ];

    return testObjectKeys(personalInfo, keys);
}

export function testContact(contact)
{
    if (!(contact instanceof Object)) return false;

    const keys = [
        "phoneNumber",
        "email",
    ];

    return testObjectKeys(contact, keys);
}

export function testColor(hexColorString)
{
    return /^#[0-9A-F]{6}$/i.test(hexColorString);
}

export function testFont(fontValue)
{
    return Boolean(fonts.find(font => font.value === fontValue));
}

export function testLayout(layoutValue)
{
    return Boolean(layouts.find(layout => layout.value === layoutValue));
}

export function testObjectKeys(object, keysArray)
{
    for (const key of keysArray)
    {
        if (!object.hasOwnProperty(key)) return false;
    }

    return true;
}