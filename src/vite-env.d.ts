/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_VERSION: string;
  readonly VITE_REACT_APP_GIT_HASH?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
