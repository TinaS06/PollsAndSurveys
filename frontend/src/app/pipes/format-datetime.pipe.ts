import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const d = new Date(value);

    const pad = (n: number) => String(n).padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
