import "../styles/LevelText.css";

export default function LevelText({itemData, textLevels})
{
    return (
        <>
            <p className="level-text">
            {
                +itemData.level === 100 ? (
                    textLevels[2]
                ) : (
                    +itemData.level > 50 ? (
                        textLevels[1]
                    ) : (
                        textLevels[0]
                    )
                )
            }
            </p>    
        </>
    )
}