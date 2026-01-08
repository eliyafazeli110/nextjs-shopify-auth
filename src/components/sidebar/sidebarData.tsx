import DashboardIcon from "../icons/DashboardIcon"
import InboxIcon from "../icons/InboxIcon"
import KanbanIcon from "../icons/KanbanIcon"
import ProductIcon from "../icons/ProductIcon"
import UsersIcon from "../icons/UsersIcon"
import SingnUpIcon from "../icons/SingnInIcon"
import SignInIcon from "../icons/SignUpIcon"

export interface SidebarItemDataFace {
  icon: React.ReactElement
  title: string
  segment: string
  href: string
  permission?: string
}

export function useSidebarItems(): SidebarItemDataFace[] {
  return [
    {
      icon: <DashboardIcon />,
      title: "داشبورد",
      href: "/admin/main",
      segment: "dashboard",
      permission: "manage_admin",
    },
    {
      icon: <KanbanIcon />,
      title: "Kanban",
      href: "#",
      segment: "kanban",
    },
    {
      icon: <InboxIcon />,
      title: "اطلاعیه",
      href: "#",
      segment: "inbox",
    },
    {
      icon: <UsersIcon />,
      title: "کاربران",
      href: "/admin/user",
      segment: "user",
      permission: "manage_users",
    },
    {
      icon: <ProductIcon />,
      title: "محصولات",
      href: "/admin/products",
      segment: "product",
      permission: "manage_products",
    },
    {
      icon: <SignInIcon />,
      title: "ثبت نام",
      href: "#",
      segment: "signup",
    },
    {
      icon: <SingnUpIcon />,
      title: "خروج",
      href: "#",
      segment: "signin",
    },
  ]
}
