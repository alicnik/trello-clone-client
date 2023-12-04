const baseURL =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.NEXT_PUBLIC_DATABASE_URL
    : 'http://localhost:8080/api/v1';

type Path = `/${string}`;
type Body = Record<string, any> | null;

export const apiClient = {
  get: async <TData>(
    path: Path,
    options: RequestInit = {}
  ): Promise<{ data: TData }> => {
    const res = await fetch(baseURL!.concat(path), options);
    return {
      data: await res.json(),
    };
  },
  post: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData }> => {
    const res = await fetch(baseURL!.concat(path), {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.error('Error fetching', path);
    }
    return {
      data: await res.json(),
    };
  },
  put: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData }> => {
    const res = await fetch(baseURL!.concat(path), {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.error('Error fetching', path);
    }
    return {
      data: await res.json(),
    };
  },
  patch: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData }> => {
    const res = await fetch(baseURL!.concat(path), {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.error('Error fetching', path);
    }
    return {
      data: await res.json(),
    };
  },
  delete: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData }> => {
    const res = await fetch(baseURL!.concat(path), {
      method: 'DELETE',
      body: JSON.stringify(body),
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      console.error('Error fetching', path);
    }
    return {
      data: await res.json(),
    };
  },
};
