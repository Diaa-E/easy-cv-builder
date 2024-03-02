import gitHubIcon from "./assets/link_icons/github.svg";
import behanceIcon from "./assets/link_icons/behance.svg";
import facebookIcon from "./assets/link_icons/facebook.svg";
import youtubeIcon from "./assets/link_icons/youtube.svg";
import linkedinIcon from "./assets/link_icons/linkedin.svg";
import instagramIcon from "./assets/link_icons/instagram.svg";
import artstationLogo from "./assets/link_icons/artstation.svg";
import otherIcon from "./assets/link_icons/other.svg";
import websiteIcon from "./assets/link_icons/website.svg";

const linkIcons = [
    {
        name: "github",
        icon: gitHubIcon,
    },
    {
        name: "behance",
        icon: behanceIcon,
    },
    {
        name: "facebook",
        icon: facebookIcon,
    },
    {
        name: "youtube",
        icon: youtubeIcon
    },
    {
        name: "linkedin",
        icon: linkedinIcon
    },
    {
        name: "instagram",
        icon: instagramIcon
    },
    {
        name: "artstation",
        icon: artstationLogo
    },
    {
        name: "website",
        icon: websiteIcon
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