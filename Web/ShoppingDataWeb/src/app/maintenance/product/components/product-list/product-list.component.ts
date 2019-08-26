import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import * as fromModels from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input()
  products: fromModels.ProductListModel[] = [];


  @Output()
  edit = new EventEmitter<fromModels.ProductUpdateModel>();

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
      headerName: 'Product',
      field: 'name',
      sortable: 'true'
    },
    {
      headerName: 'Brand',
      field: 'brand',
      sortable: 'true'
    },
    {
      headerName: 'Section',
      field: 'section',
      sortable: 'true'
    },
    {
      headerName: 'Type',
      field: 'type',
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
    let product = this.products.find(x=>x.id===id);
    this.edit.emit(product);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}

