import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchFilter',
  standalone: false
})
export class SearchFilterPipe implements PipeTransform {
  transform<T>(
    items: T[],
    search: string,
    config: {
      key?: keyof T;
      mode?: 'starts' | 'contains';
      caseSensitive?: boolean;
    } = {}
  ): T[] {
    if (!items || !search) return items;

    const {
      key,
      mode = 'contains',
      caseSensitive = false
    } = config;

    const value = caseSensitive
      ? search
      : search.toLowerCase();

    return items.filter(item => {
      const target = key
        ? String(item[key] ?? '')
        : String(item);

      const text = caseSensitive
        ? target
        : target.toLowerCase();

      return mode === 'starts'
        ? text.startsWith(value)
        : text.includes(value);
    });
  }
}
