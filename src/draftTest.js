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

function testLanguages(languagesArray)
{
    for (const language of languagesArray)
    {
        if (!(+language.level % 20 === 0 && +language.level > 0 && +language.level <= 100))
        {
            return false;
        }
    }

    return true;
}

function testSkills(skillsArray)
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

function testLinks(linksArray)
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