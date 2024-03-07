export const PITCH_OPTIONS = ['-2', '-1', '0', '+1', '+2'] as const;
export type Pitch = (typeof PITCH_OPTIONS)[number];
export const DEFAULT_PITCH = '0';
