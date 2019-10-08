import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { StoreModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent  implements OnInit {
  @Input()
  stores: StoreModel[] = [];

  @Output()
  edit = new EventEmitter<StoreModel>();

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
      headerName: 'Store',
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
    let store = this.stores.find(x=>x.id===id);
    this.edit.emit(store);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
