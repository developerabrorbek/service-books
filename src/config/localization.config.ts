declare interface LocalizationConfigOptions {
  BASE_URL: string;
}

export const localizationConfig: LocalizationConfigOptions = {
  BASE_URL: process.env.LOCALIZATION_BASE_URL ?? "http://127.0.0.1:3002"
}




