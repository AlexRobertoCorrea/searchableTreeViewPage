const baseUrl = 'https://fake-api.tractian.com'

export const getCompanies = async () => {
  const response = await fetch(`${baseUrl}/companies`)

  return response.json()
}

export const getLocations = async (companyId: string) => {
  const response = await fetch(`${baseUrl}/companies/${companyId}/locations`)

  return response.json()
}

export const getAssets = async (companyId: string) => {
  const response = await fetch(`${baseUrl}/companies/${companyId}/assets`)

  return response.json()
}
