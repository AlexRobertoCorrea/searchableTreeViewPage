const baseUrl = 'https://fake-api.tractian.com'

export const getCompanies = async() => {
  return await fetch(`${baseUrl}/companies`)
}

export const getLocations = async(companyId: string) => {
  return await fetch(`${baseUrl}/companies/${companyId}/locations`)
}

export const getAssets = async(companyId: string) => {
  return await fetch(`${baseUrl}/companies/${companyId}/assets`)
}