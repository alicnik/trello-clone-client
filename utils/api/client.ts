const baseURL =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.NEXT_PUBLIC_DATABASE_URL
    : 'http://localhost:8080/api/v1';

type Path = `/${string}`;
type Body = Record<string, any> | null;

async function safeJson(res: Response) {
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error parsing JSON', { err });
    return null;
  }
}

export const apiClient = {
  get: async <TData>(
    path: Path,
    options: RequestInit = {}
  ): Promise<{ data: TData; ok: boolean }> => {
    const res = await fetch(baseURL!.concat(path), options);
    return {
      data: await safeJson(res),
      ok: res.ok,
    };
  },
  post: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData; ok: boolean }> => {
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
      data: await safeJson(res),
      ok: res.ok,
    };
  },
  put: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData; ok: boolean }> => {
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
      data: await safeJson(res),
      ok: res.ok,
    };
  },
  patch: async <TData>(
    path: Path,
    body: Body,
    options: RequestInit = {}
  ): Promise<{ data: TData; ok: boolean }> => {
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
      data: await safeJson(res),
      ok: res.ok,
    };
  },
  delete: async <TData>(
    path: Path,
    options: RequestInit = {}
  ): Promise<{ data: TData; ok: boolean }> => {
    const res = await fetch(baseURL!.concat(path), {
      method: 'DELETE',
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
      data: await safeJson(res),
      ok: res.ok,
    };
  },
};
