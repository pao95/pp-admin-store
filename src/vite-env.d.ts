/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    // más variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }