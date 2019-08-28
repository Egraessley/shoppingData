import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TypeModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit {
  @Input()
  types: TypeModel[] = [];

  @Output()
  edit = new EventEmitter<TypeModel>();

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
      headerName: 'Type',
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
    let type = this.types.find(x=>x.id===id);
    this.edit.emit(type);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
