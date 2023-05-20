export default interface Paginated<T = unknown> {
  total: number;
  current: number;
  data: T;
}
