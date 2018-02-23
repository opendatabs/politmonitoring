import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(text: string, search): string {
        var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        pattern = pattern.split(' ').filter((t) => {
            return t.length > 0;
        }).join('|');
        var regex = new RegExp(pattern, 'gi');

        if (typeof text !== 'undefined' && text.length > 0)
            return search ? text.replace(regex, (match) => `<span class="highlight_search_text">${match}</span>`) : text;
        else
          return text;
    }

}
