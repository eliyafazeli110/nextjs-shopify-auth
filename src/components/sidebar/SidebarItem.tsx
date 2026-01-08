import WrapperIcon from "../icons/WrapperIcon"
import AccessControl from "../shared/AccessControl"
import { useSidebarItems } from "./sidebarData"

function SidebarItem() {
  const itemsData = useSidebarItems()

  return (
    <ul className="space-y-2 font-medium">
      {itemsData.map((item, index) => (
        <li key={index}>
          <AccessControl permission={item.permission ?? ""}>
            <WrapperIcon item={item} />
          </AccessControl>
        </li>
      ))}
    </ul>
  )
}

export default SidebarItem
