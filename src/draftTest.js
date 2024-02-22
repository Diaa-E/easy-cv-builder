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
            valid: testFont(draft.font),
        },
        {
            name: "layout",
            valid: testLayout(draft.layout),
        },
        {
            name: "links",
            valid: testLinks(draft.links),
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
        if (!(+language.level % 20 === 0 && +language.level > 0 && +language.level <= 100))
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
    for (const skill of skillsArray)
    {
        if (!(+skill.level % 20 === 0 && +skill.level > 0 && +skill.level <= 100))
        {
            return false;
        }
    }

    return true;
}

export function testLinks(linksArray)
{
    for (const link of linksArray)
    {
        if (!Boolean(linkIcons.find(icon => link.icon === icon.name)))
        {
            return false;
        }
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