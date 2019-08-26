import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { BrandModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  @Input()
  brands: BrandModel[] = [];

  @Output()
  edit = new EventEmitter<BrandModel>();

  @Output()
  delete = new EventEmitter<number>();

  columnDefs = [
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: GridButtonsComponent,
      autoHeight: true,
    },
    {
      headerName: 'Brand',
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
    onGridReady: () => {
      this.gridOptions.api.sizeColumnsToFit();
    },
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {}

  onEdit(id: number): void {
    let brand = this.brands.find(x=>x.id===id);
    this.edit.emit(brand);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
