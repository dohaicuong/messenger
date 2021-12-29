/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_API_SUBSCRIPTION_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
