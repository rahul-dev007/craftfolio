declare module "pdf-parse" {
  export interface PDFInfo {
    numpages?: number;
    numrender?: number;
    info?: any;
    metadata?: any;
    version?: string;
  }
  export interface PDFData {
    text: string;
    info?: PDFInfo;
    metadata?: any;
    version?: string;
  }
  // default export (CommonJS wrapped) — esModuleInterop=true থাকলে default import কাজ করবে
  export default function pdf(data: Buffer | Uint8Array): Promise<PDFData>;
}
