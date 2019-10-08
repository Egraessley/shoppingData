import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import { StoreModel } from '../../../../shared/models';
import { getStoreEntities, StoreCreated, StoreSaved, StoreDeleted } from '../../../store';
import { StoreFormComponent } from '../../components/store-form/store-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'sd-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores$: Observable<StoreModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.stores$ = this.store.pipe(select(getStoreEntities));
  }

  onCreate() {
    let modal = this.modalService.show(StoreFormComponent,{
      initialState: {
        store: {
          id: 0,
          name: ''
        }
      }
    });

    modal.content.save.subscribe((store:StoreModel)=>{
      this.store.dispatch(new StoreCreated({store}));
      modal.hide();
    });
  }

  onEdit(oldStore: StoreModel) {
    let modal = this.modalService.show(StoreFormComponent,{
      initialState: {store: oldStore}
    });

    modal.content.save.subscribe((store:StoreModel)=>{
      this.store.dispatch(new StoreSaved({store}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Store?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new StoreDeleted({id}));
      }
    });
  }

}
