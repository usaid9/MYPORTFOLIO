import {
  VscGithubInverted
} from "react-icons/vsc";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope
} from "react-icons/fa";

import Dock from "../../components/Dock";

const items = [
  {
    icon: <FaInstagram size={18} />,
    label: "Instagram",
    onClick: () => window.open(
      "https://www.instagram.com/u_said_a",
      "_blank"
    ),
  },
  {
    icon: <FaWhatsapp size={18} />,
    label: "WhatsApp",
    onClick: () => window.open(
      "https://wa.me/923006946332",
      "_blank"
    ),
  },
  {
    icon: <FaEnvelope size={18} />,
    label: "Gmail",
    onClick: () => window.location.href =
      "mailto:usaidmoiza@gmail.com",
  },
  {
    icon: <VscGithubInverted size={18} />,
    label: "GitHub",
    onClick: () => window.open(
      "https://github.com/usaid9",
      "_blank"
    ),
  },
];

export default function Mydock() {
  return (
    <Dock
      items={items}
      panelHeight={70}
      baseItemSize={50}
      magnification={70}
      className="fixed"
    />
  )
}