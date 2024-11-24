export interface ImageData {
    id: number | string;
    src: string;
    alt: string;
    type?: 'jpg' | 'png' | 'gif';
    width?: number;
    height?: number;
  }