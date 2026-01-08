import React from "react"
import { selectUser } from "@/Redux/authSlice"
import { useSelector } from "react-redux"

export default function AccessControl({
  permission,
  children,
}: {
  permission: string
  children: React.ReactNode
}) {
  const user = useSelector(selectUser)
  console.log(user, "userLog")

  if (user?.user?.permissions?.includes(permission)) null

  return <>{children}</>
}
