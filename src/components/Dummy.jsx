export default function Dummy({handleClick})
{
    return (
        <div data-testid="dummy">
            <button onClick={(handleClick)}>Dummy Button</button>
        </div>
    )
}