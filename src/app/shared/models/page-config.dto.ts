export interface PageConfigDTO<F> {
  page: number;
  size: number;
  filters?: Partial<F>;
}
