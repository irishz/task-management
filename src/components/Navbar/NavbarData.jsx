import { HiHome } from "react-icons/hi";

const NavbarMenuList = {
  admin: [
    {
      name: "admin-home",
      name_th: "หน้าแรก",
      url: "/admin",
      icon: <HiHome size="1.2em" />,
    },
  ],
  user: [
    {
      name: "home",
      name_th: "หน้าแรก",
      url: "/",
      icon: <HiHome size="1.2em" />,
    },
    {
      name: "job-new",
      name_th: "ร้องของานใหม่",
      url: "/job/new",
    },
  ],
};

export default NavbarMenuList