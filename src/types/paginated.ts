export default interface Paginated<T = unknown> {
  totalPages: number;
  currentPage: number;
  content: T;
}
