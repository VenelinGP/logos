import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from '../../../models/Offer';

@Pipe({
  name: 'sortByPrice'
})
export class SortByPricePipe implements PipeTransform {
  transform(items: Offer[], sort: string): any {
    if (items) {
      if (sort === 'isAsc') {
        return items.sort((x, y) => {
          return (
            Number(x.price.replace(' ', '')) - Number(y.price.replace(' ', ''))
          );
        });
      } else if (sort === 'isDesc') {
        return items.sort((x, y) => {
          return (
            Number(y.price.replace(' ', '')) - Number(x.price.replace(' ', ''))
          );
        });
      } else {
        return items;
      }
    }
  }
}
