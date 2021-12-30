import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {


    transform(list: Array<any>, query: string): any {
        if(query){
            return list.filter((std)=> std.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        } else {
            return list;
        }
    }
}