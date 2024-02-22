import fonts from "./fonts";
import layouts from "./layouts";
import linkIcons from "./linkIconsBarrel";

export function testDraftValidity(draft)
{
    const dataIntegrity = [
        {
          name: "accentColor",
          valid: testColor(draft.accentColor),
        },
        {
            name: "font",
            valid: testFont(draft.font, fonts),
        },
        {
            name: "layout",
            valid: testLayout(draft.layout, layouts),
        },
        {
            name: "links",
            valid: testLinks(draft.links, linkIcons),
        },
        {
            name: "skills",
            valid: testSkills(draft.skills),
        },
        {
            name: "languages",
            valid: testLanguages(draft.languages),
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

export function testLanguages(languagesArray)
{
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
    const previousIds = [];

    for (const skill of skillsArray)
    {
        //invalid level values
        if (!(+skill.level % 20 === 0 && +skill.level > 0 && +skill.level <= 100))
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