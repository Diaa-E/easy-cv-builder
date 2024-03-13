export function fixDraft(draft, invalidKeys, defaultTemplate)
{
    for (const key of invalidKeys)
    {
        draft[key] = defaultTemplate[key];
    }

    return draft;
}