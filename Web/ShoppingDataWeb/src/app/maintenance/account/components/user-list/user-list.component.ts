import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { UserListModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';
import { FullNameComponent } from '../../../../shared/components/ag-grid/full-name/full-name.component';
import { ActiveColumnComponent } from '../../../../shared/components/ag-grid/active-column/active-column.component';

@Component({
  selector: 'sd-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input()
  users: UserListModel[] = [];

  @Output()
  edit = new EventEmitter<UserListModel>();

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
      headerName: 'User',
      field: 'firstName',
      cellRendererFramework: FullNameComponent,
      sortable:true
    },
    {
      headerName: 'Username',
      field: 'userName',
      sortable:true
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable:true
    },
    {
      headerName: 'Admin',
      field: 'isAdmin',
      sortable:true,
      cellRendererFramework: ActiveColumnComponent
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
    let user = this.users.find(x=>x.id===id);
    this.edit.emit(user);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
