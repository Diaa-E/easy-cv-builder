import gitHubIcon from "./assets/link_icons/github.svg";
import behanceIcon from "./assets/link_icons/behance.svg";
import otherIcon from "./assets/link_icons/other.svg";

const linkIcons = [
    {
        name: "github",
        icon: gitHubIcon,
    },
    {
        name: "behance",
        icon: behanceIcon,
    },
].sort((a, b) => {
    if (a.name < b.name)
    {
        return -1;
    }
    else if (a.name > b.name)
    {
        return 1;
    }
    else
    {
        return 0;
    }
});

linkIcons.push(
    {
        name: "other",
        icon: otherIcon,
    }
);

export default linkIcons;