export default function About({enabled = true})
{
    if (enabled)
    {
        return (
            <div className="items-container">
                <h2>Easy CV Builder v1.0.0</h2>
                <p>Created by Diaa E.</p>
                <p>Project's Repo <a href="https://github.com/Diaa-E/easy-cv-builder">Easy CV Builder repo</a></p>
                <p>My Github <a href="https://github.com/Diaa-E">Diaa E. on github</a></p>
            </div>
        )
    }
    else
    {
        return <></>
    }
}