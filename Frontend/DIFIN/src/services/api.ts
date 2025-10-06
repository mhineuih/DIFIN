// src/services/api.ts
export const API_HOST = 'http://10.0.2.2:3000'; // emulator; replace with PC LAN IP for device

export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  [k: string]: any;
}

export async function postJson(path: string, body: any) {
  const res = await fetch(`${API_HOST}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function getJson(path: string) {
  const res = await fetch(`${API_HOST}${path}`);
  return res.json();
}
