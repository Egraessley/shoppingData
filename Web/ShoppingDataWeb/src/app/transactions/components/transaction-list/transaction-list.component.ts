import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TransactionListModel } from '../../../shared/models';
import { GridButtonsComponent } from '../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';
import { ShortDateComponent } from '../../../shared/components/ag-grid/short-date/short-date.component';

@Component({
  selector: 'sd-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Input()
  transactions: TransactionListModel[] = [];

  @Output()
  edit = new EventEmitter<number>();

  columnDefs = [
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: GridButtonsComponent,
      autoHeight: true,
    },
    {
      headerName: 'Date',
      field: 'date',
      sortable: 'true',
      cellRendererFramework: ShortDateComponent
    },
    {
      headerName: 'Price',
      field: 'price',
      sortable: 'true',
    },
    {
      headerName: 'Items',
      field: 'items',
      sortable: 'true',
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
    this.edit.emit(id);
  }
}
