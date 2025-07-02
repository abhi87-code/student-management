// utils/auth.js
import { jwtDecode } from 'jwt-decode'; // ✅ Correct

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    // JWT exp is in seconds, Date.now() in ms
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}
