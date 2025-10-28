export interface PageDTO<D> {
  content: D;
  pageable: PageableDTO;
  totalPages: number;
  totalElements: number;
}

export interface PageableDTO {
  pageNumber: number;
  pageSize: number;
}