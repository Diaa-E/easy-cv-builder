export default function About({version, enabled = true})
{
    if (enabled)
    {
        return (
            <div role="region" className="items-container">
                <h2 className="app-title">Easy CV Builder v{version}</h2>
                <p>©️ {(new Date).getFullYear()} Diaa E.</p>
                <p>Changes <a target="_blank" href="https://github.com/Diaa-E/easy-cv-builder/blob/main/CHANGELOG.md">Change log</a></p>
                <p>Source code <a target="_blank" href="https://github.com/Diaa-E/easy-cv-builder">Easy CV Builder repository</a></p>
                <p>My Github <a target="_blank" href="https://github.com/Diaa-E">Diaa E. on github</a></p>
            </div>
        )
    }
    else
    {
        return <></>
    }
}