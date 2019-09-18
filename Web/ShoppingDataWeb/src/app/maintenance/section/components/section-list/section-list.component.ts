import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { SectionModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent  implements OnInit {
  @Input()
  sections: SectionModel[] = [];

  @Output()
  edit = new EventEmitter<SectionModel>();

  @Output()
  delete = new EventEmitter<number>();

  columnDefs = [
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: GridButtonsComponent,
      autoHeight: true,
      width: 50,
    },
    {
      headerName: 'Section',
      field: 'name',
      sortable: 'true'
    }    
  ];

  gridOptions: GridOptions = {
    suppressCellSelection: true,
    context: {
      componentParent: this,
    },
    rowHeight: 40,
    headerHeight: 52,
    onGridReady: () => {
      this.gridOptions.api.sizeColumnsToFit();
    },
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {}

  onEdit(id: number): void {
    let section = this.sections.find(x=>x.id===id);
    this.edit.emit(section);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
