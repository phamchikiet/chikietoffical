import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function kataSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const fileName = _options.name || 'default-name';
    tree.create(
      `src/app/${fileName}/${fileName}.component.ts`,
     `
import { Component } from '@angular/core';
@Component({
  selector: 'app-${fileName}',
  template: '<h1>${fileName} Component</h1>',
  styles: ['']
})
export class ${capitalize(fileName)}Component {} 
      `,
    );

    tree.create(
      `src/app/${fileName}/${fileName}.html`,     `
<app-swiper [Heading]="''" class="bg-[#5D0711]/50" />
<app-keyfigures [Heading]="''" class="container mx-auto" />
<div class="bg-[#F3E5AB] w-full">
    <app-gioithieu [Heading]="''" class="container mx-auto" />
</div>
<app-products [Heading]="''" class="container mx-auto" />
<div class="w-full bg-[#5D0711]/50">
    <app-swiper [Heading]="''" [Config]="ChuyenGiaConfig" class="flex container mx-auto py-4"/>
</div>
<app-bannercta [Heading]="''" class="container mx-auto py-4"/>
<app-baiviet [Heading]="''" class="container mx-auto py-4"/>
<app-contactform [Heading]="''" class="container mx-auto py-4"/>

      `,
    );

    return tree;
  };
}
