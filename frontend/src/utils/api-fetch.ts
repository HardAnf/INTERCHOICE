type ResponseMapper<T> = (data: Response) => Promise<T> | T

export class FetchError extends Error {
  constructor(message: string, readonly status: number, readonly response: unknown) {
    super(message)
    this.name = 'FetchError'
    Object.setPrototypeOf(this, FetchError.prototype)
  }

  get responseData(): unknown {
    return this.response
  }
}

function handleResponse<R>(response: Response, responseMapper?: ResponseMapper<R>): Promise<R> {
  if (responseMapper) {
    return Promise.resolve(responseMapper(response))
  } else {
    const contentType: string | null = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return Promise.resolve<R>(response.json())
    } else {
      throw new Error('Default handler supports only json data')
    }
  }
}

export const BASE_URL: string = process.env.BACKEND_URL ?? ''
console.info(`BASE_URL: ${BASE_URL}`)

export async function jsonFetch<T>(
  url: string,
  options: RequestInit = {},
  responseMapper?: ResponseMapper<T>
): Promise<T> {
  return apiFetch<T>(
    url,
    { headers: { 'Content-type': 'application/json', ...options.headers }, ...options },
    responseMapper
  )
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  responseMapper?: ResponseMapper<T>
): Promise<T> {
  const response: Response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options?.headers
    },
    credentials: 'include'
  })

  if (!response.ok) {
    throw new FetchError(
      response.statusText,
      response.status,
      response.headers?.get('content-type')?.includes('application/json')
        ? await response.json()
        : response.text()
    )
  }

  return handleResponse(response, responseMapper)
}
