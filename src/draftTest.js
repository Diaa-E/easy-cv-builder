import fonts from "./fonts";
import layouts from "./layouts";
import linkIcons from "./linkIconsBarrel";

export function testDraftValidity(draft)
{
    const dataIntegrity = [
        {
          name: "accentColor",
          valid: testColor(draft?.accentColor),
        },
        {
            name: "font",
            valid: testFont(draft?.font, fonts),
        },
        {
            name: "layout",
            valid: testLayout(draft?.layout, layouts),
        },
        {
            name: "links",
            valid: testLinks(draft?.links, linkIcons),
        },
        {
            name: "skills",
            valid: testSkills(draft?.skills),
        },
        {
            name: "languages",
            valid: testLanguages(draft?.languages),
        },
        {
            name: "education",
            valid: testEducation(draft?.education),
        },
        {
            name: "experience",
            valid: testExperience(draft?.experience),
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

export function testExperience(experienceArray)
{
    if (!Array.isArray(experienceArray)) return false;

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