import { AiFillHome } from "react-icons/ai";

const NavbarMenuList = {
  admin: [
    {
      name: "admin-home",
      name_th: "หน้าแรก",
      url: "/admin",
      icon: <AiFillHome />,
    },
  ],
  user: [
    {
      name: "home",
      name_th: "หน้าแรก",
      url: "/",
      icon: <AiFillHome />,
    },
    {
      name: "task-new",
      name_th: "ร้องของานใหม่",
      url: "/task/new",
    },
  ],
};

export default NavbarMenuList