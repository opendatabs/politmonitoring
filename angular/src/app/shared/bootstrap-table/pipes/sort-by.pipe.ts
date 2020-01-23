import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(array: Array<string>, sortBy: string, asc: boolean): Array<string> {
        array.sort((a: any, b: any) => {
            let returnValue: number;
            if (a[sortBy] < b[sortBy]) {
                returnValue = -1;
            } else if (a[sortBy] > b[sortBy]) {
                returnValue = 1;
            } else {
                returnValue = 0;
            }
            if (asc) {
                return returnValue;
            } else {
                return returnValue * (-1);
            }
        });
        return array;
    }

}
