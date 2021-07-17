function requireEnvVariable (name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} was not provided.`)
  }

  return value
}

export const DATABASE_URL = requireEnvVariable('DATABASE_URL') as string
export const PORT = requireEnvVariable('PORT') as string
