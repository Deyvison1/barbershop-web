export interface BaseImageDTO {
  id: string;
  filename: string;
  itemImageSrc: string;
  thumbnailImageSrc: string;
  contentType?: string;
  title?: string;
  active?: boolean;
}