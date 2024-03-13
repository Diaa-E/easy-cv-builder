import "../styles/LevelText.css";
import { calculateTextLevel } from "../utils/calculateTextLevel";

export default function LevelText({itemData, textLevels = [{name: "High", min: 100}, {name: "Medium", min: 50}, {name: "Low", min: 0}]})
{
    /* textLevels must be passed in decending order for the matching to work */
    return (
        <>
            <p className="level-text">
            {
                calculateTextLevel(textLevels, itemData.level)
            }
            </p>    
        </>
    )
}