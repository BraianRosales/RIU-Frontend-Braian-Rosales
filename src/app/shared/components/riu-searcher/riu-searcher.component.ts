import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../material-ui.imports';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-riu-searcher',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule],
  templateUrl: './riu-searcher.component.html',
  styleUrl: './riu-searcher.component.scss'
})
export class RiuSearcherComponent {
  readonly labelText = input<string>('Buscar');
  readonly placeholderText = input<string>('Buscar por nombre...');
  readonly searchChanged = output<string>();  
  searchControl = new FormControl('');
  
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),                  
        distinctUntilChanged()
      )
      .subscribe(value => {
        const searchValue = value ?? '';
        this.searchChanged.emit(searchValue);
      });
  }
}
