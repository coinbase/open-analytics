import { Config, InputConfig } from '../types/config';
import { SERVICE_URL_ERROR } from './errors.ts'; // TODO: fix this or create this

export const BATCH_PERIOD = 5 * 1000; // 5s
export const BATCH_THRESHOLD = 30;

export const DEFAULT_CONFIG = {
  isProd: false,
  platform: 'unknown',
  projectName: '',
  isDebug: false,
  onError: () => undefined,
  eventPath: '/events',
  metricPath: '/metrics',
  serviceUrl: 'provide.service.url',
  disabled: false,
  isAlwaysAuthed: false,
  version: null,
  ricTimeoutScheduleEvent: 1000,
  ricTimeoutSetDevice: 500,
  apiEndpoint: '', // TODO followup - where we are going to default sent the data
};

const validateUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const init = (config: InputConfig): Config => {
  // validated config
  if (!validateUrl(config.serviceUrl)) {
    throw SERVICE_URL_ERROR;
  }

  return {
    ...DEFAULT_CONFIG,
    ...config
  };
}
