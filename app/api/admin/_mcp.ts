const MCP_API_URL = process.env.MCP_API_URL!
const MCP_API_SECRET = process.env.MCP_API_SECRET!

export async function llamarMcp(herramienta: string, params: Record<string, unknown>) {
  const res = await fetch(`${MCP_API_URL}/tools/${herramienta}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MCP-Secret': MCP_API_SECRET,
    },
    body: JSON.stringify(params),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error ?? `Error llamando a ${herramienta}`)
  }
  return data
}
