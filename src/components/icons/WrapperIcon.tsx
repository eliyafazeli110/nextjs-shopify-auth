import ActiveLink from "../shared/ActiveLink"
import { SidebarItemDataFace } from "../sidebar/sidebarData"

interface WrapperIconProps {
  item: SidebarItemDataFace
}

export default function WrapperIcon({ item }: WrapperIconProps) {
  return (
    <ActiveLink href={item.href}>
      {({ active }) => (
        <div
          className={[
            "flex items-center text-gray-900 p-4 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition-colors duration-200",
            active ? "bg-green-600" : "",
          ].join(" ")}
        >
          {item.icon}
          <span className="flex-1 ms-3 whitespace-nowrap">{item.title}</span>
        </div>
      )}
    </ActiveLink>
  )
}
