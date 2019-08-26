import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import { TagModel } from '../../../../shared/models';
import { getTagEntities, TagCreated, TagSaved, TagDeleted } from '../../../store';
import { TagFormComponent } from '../../components/tag-form/tag-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'sd-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tags$: Observable<TagModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.tags$ = this.store.pipe(select(getTagEntities));
  }

  onCreate() {
    let modal = this.modalService.show(TagFormComponent,{
      initialState: {
        tag: {
          id: 0,
          name: ''
        }
      }
    });

    modal.content.save.subscribe((tag:TagModel)=>{
      this.store.dispatch(new TagCreated({tag}));
      modal.hide();
    });
  }

  onEdit(oldTag: TagModel) {
    let modal = this.modalService.show(TagFormComponent,{
      initialState: {tag: oldTag}
    });

    modal.content.save.subscribe((tag:TagModel)=>{
      this.store.dispatch(new TagSaved({tag}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Tag?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new TagDeleted({id}));
      }
    });
  }

}
