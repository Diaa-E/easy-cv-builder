import gitHubIcon from "./assets/link_icons/github.svg";
import behanceIcon from "./assets/link_icons/behance.svg";
import facebookIcon from "./assets/link_icons/facebook.svg";
import youtubeIcon from "./assets/link_icons/youtube.svg";
import linkedinIcon from "./assets/link_icons/linkedin.svg";
import instagramIcon from "./assets/link_icons/instagram.svg";
import artstationLogo from "./assets/link_icons/artstation.svg";
import otherIcon from "./assets/link_icons/other.svg";

const linkIcons = [
    {
        name: "Github",
        icon: gitHubIcon,
    },
    {
        name: "Behance",
        icon: behanceIcon,
    },
    {
        name: "Facebook",
        icon: facebookIcon,
    },
    {
        name: "YouTube",
        icon: youtubeIcon
    },
    {
        name: "LinkedIn",
        icon: linkedinIcon
    },
    {
        name: "Instagram",
        icon: instagramIcon
    },
    {
        name: "Art Station",
        icon: artstationLogo
    }
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