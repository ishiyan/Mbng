import { DynamicThemingParameters } from './generate';

export interface DynamicThemingPreset {
  name: string;
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  parameters: DynamicThemingParameters;
}