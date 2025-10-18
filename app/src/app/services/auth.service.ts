import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private cookieService = inject(CookieService);

  private _isLoggedIn = signal(false);
  isLoggedIn = this._isLoggedIn.asReadonly();

  // Guarda referencia al timer de auto-logout para poder limpiarlo
  private logoutTimer: any = null;

  // Nombre de la cookie(s)
  private SESSION_COOKIE = 'sh_session';
  private EXPIRES_COOKIE = 'sh_session_exp'; // timestamp ms

  constructor() {
    // Al crear el servicio, intentamos restaurar la sesión desde cookie
    this.restoreSessionFromCookie();
  }

  // Simula llamada al servidor — retorna Promise<boolean>
  async login(username: string, password: string): Promise<boolean> {
    // Simulamos latencia (1s)
    const ok = await new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(username === 'admin@admin.com' && password === 'admin');
      }, 1000);
    });

    if (ok) {
      // 2 horas en ms
      const twoHoursMs = 1 * 60 * 60 * 1000;
      const expiresAt = Date.now() + twoHoursMs;

      // Puedes guardar un token real aquí; para el demo dejamos "1"
      this.cookieService.set(this.SESSION_COOKIE, '1', {
        expires: new Date(expiresAt), // cookie expiry
        path: '/',
        sameSite: 'Lax'
      });

      // Guardamos también el timestamp de expiración para calcular el auto-logout
      // (lo dejamos en otra cookie para simplicidad)
      this.cookieService.set(this.EXPIRES_COOKIE, String(expiresAt), {
        expires: new Date(expiresAt),
        path: '/',
        sameSite: 'Lax'
      });

      this._isLoggedIn.set(true);
      // iniciar auto-logout
      this.startAutoLogout(expiresAt - Date.now());
      // navegar
      this.router.navigate(['/catalog']);
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // limpiar cookies y estado
    try {
      this.cookieService.delete(this.SESSION_COOKIE, '/');
      this.cookieService.delete(this.EXPIRES_COOKIE, '/');
    } catch (e) {
      // fallback: delete all paths (si hiciera falta)
      this.cookieService.delete(this.SESSION_COOKIE);
      this.cookieService.delete(this.EXPIRES_COOKIE);
    }

    this._isLoggedIn.set(false);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    this.router.navigate(['/login']);
  }

  // Al iniciar la app, intenta restaurar sesión desde cookie
  private restoreSessionFromCookie(): void {
    const sessionVal = this.cookieService.get(this.SESSION_COOKIE);
    const exp = this.cookieService.get(this.EXPIRES_COOKIE);

    if (sessionVal && exp) {
      const expNum = Number(exp);
      const now = Date.now();

      if (!isNaN(expNum) && expNum > now) {
        // session válida: restaura estado y arma el timer con lo que falta
        this._isLoggedIn.set(true);
        const remaining = expNum - now;
        this.startAutoLogout(remaining);
        return;
      }
    }

    // si no hay cookie o expiró: asegurar estado limpio
    this._isLoggedIn.set(false);
  }

  // Programa el auto-logout con el ms restante
  private startAutoLogout(msFromNow: number): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    // Si el tiempo ya pasó, desloguea inmediatamente
    if (msFromNow <= 0) {
      this.logout();
      return;
    }

    // Limitar a número seguro (setTimeout acepta hasta ~2^31-1 ms)
    const MAX_TIMEOUT = 2147483647;
    if (msFromNow > MAX_TIMEOUT) {
      // Si es mayor al máximo, programamos un timer intermedio para volver a calcular
      this.logoutTimer = setTimeout(() => this.startAutoLogout(msFromNow - MAX_TIMEOUT), MAX_TIMEOUT);
      return;
    }

    this.logoutTimer = setTimeout(() => {
      // Al expirar: limpia y fuerza logout
      this.logout();
      // opcional: toast/alert que diga "Sesión expirada"
      alert('Tu sesión ha expirado. Por favor, ingresa de nuevo.');
    }, msFromNow);
  }
}
