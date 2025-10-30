import { BaseImageDTO } from '../models/base/base-image.dto';

interface MinimalImageDTO {
  id: string;
  filename: string;
  data?: string;
  contentType?: string;
  active?: boolean;
}

export const converter = <T extends MinimalImageDTO>(
  images: T[]
): BaseImageDTO[] => {
  return images.map((img) => ({
    id: img.id,
    filename: img.filename,
    itemImageSrc: img.data ? `data:${img.contentType};base64,${img.data}` : '',
    thumbnailImageSrc: img.data
      ? `data:${img.contentType};base64,${img.data}`
      : '',
    title: img.filename,
    active: !!img.active,
  }));
};
