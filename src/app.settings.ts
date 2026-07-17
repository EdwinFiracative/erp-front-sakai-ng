import { InjectionToken } from '@angular/core';

/**
 * Central application configuration values used across the app.
 */
export interface AppSettings {
  /** Display name shown in the UI. */
  title: string;

  /** Semantic version shown for the current frontend build. */
  version: string;

  /** Base URL for backend API requests. */
  apiUrl: string;
}

/**
 * Default runtime settings used by dependency injection.
 */
export const appSettings: AppSettings = {
  title: 'MDSERPFRONT',
  version: '1.0',
  apiUrl: 'https://erp.proelectricos.com/api', // Basic URL to the backend API.
};

/**
 * Injection token to provide and consume AppSettings in Angular services/components.
 */
export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
