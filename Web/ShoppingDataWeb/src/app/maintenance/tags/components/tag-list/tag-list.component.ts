import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TagModel } from '../../../../shared/models';
import { GridButtonsComponent } from '../../../../shared/components/ag-grid/grid-buttons/grid-buttons.component';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'sd-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  @Input()
  tags: TagModel[] = [];

  @Output()
  edit = new EventEmitter<TagModel>();

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
      headerName: 'Tag',
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
    let tag = this.tags.find(x=>x.id===id);
    this.edit.emit(tag);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
