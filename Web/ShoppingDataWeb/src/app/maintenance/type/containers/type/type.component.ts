import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import { TypeModel } from '../../../../shared/models';
import { getTypeEntities, TypeCreated, TypeSaved, TypeDeleted } from '../../../store';
import { TypeFormComponent } from '../../components/type-form/type-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'sd-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  types$: Observable<TypeModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.types$ = this.store.pipe(select(getTypeEntities));
  }

  onCreate() {
    let modal = this.modalService.show(TypeFormComponent,{
      initialState: {
        type: {
          id: 0,
          name: ''
        }
      }
    });

    modal.content.save.subscribe((type:TypeModel)=>{
      this.store.dispatch(new TypeCreated({type}));
      modal.hide();
    });
  }

  onEdit(oldType: TypeModel) {
    let modal = this.modalService.show(TypeFormComponent,{
      initialState: {type: oldType}
    });

    modal.content.save.subscribe((type:TypeModel)=>{
      this.store.dispatch(new TypeSaved({type}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Type?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new TypeDeleted({id}));
      }
    });
  }

}
