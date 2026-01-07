const storeLoginToken = async (token: string) => {
  const res = await fetch("/api/auth/login", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
}

const removeLoginToken = async () => {
  const res = await fetch("/api/auth/login", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return res
}

export { removeLoginToken, storeLoginToken }
