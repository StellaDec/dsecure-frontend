/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_ENCRYPTION: string;
  readonly VITE_DEBUG: string;
  readonly VITE_GA4_ID: string;
  readonly VITE_CLARITY_ID: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_RES_KEY: string;
  readonly VITE_REQ_KEY: string;
  readonly VITE_ENC_IV: string;
  readonly VITE_FILE_ERASER: string;
  readonly VITE_DRIVE_ERASER: string;
  readonly VITE_FILE_ERASER_WINDOWS_DOWNLOAD_LINK: string;
  readonly VITE_DRIVE_ERASER_ISO_DOWNLOAD_LINK: string;
  readonly VITE_DRIVE_ERASER_DIAGNOSTIC_ISO_DOWNLOAD_LINK: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}