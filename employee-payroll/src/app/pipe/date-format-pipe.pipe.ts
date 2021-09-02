import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipePipe implements PipeTransform {

  /**
   * Purpose: To pipe date and transform it in desired format
   * 
   * @param value actual format of date
   * @returns desired format of date
   */
  
  transform(value: string) {
    var datePipe = new DatePipe("en-US");
     value = datePipe.transform(value, 'dd MMM yyyy');
     return value;
 }

}
