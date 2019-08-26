import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import { SectionModel } from '../../../../shared/models';
import { getSectionEntities, SectionCreated, SectionSaved, SectionDeleted } from '../../../store';
import { SectionFormComponent } from '../../components/section-form/section-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'sd-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  sections$: Observable<SectionModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.sections$ = this.store.pipe(select(getSectionEntities));
  }

  onCreate() {
    let modal = this.modalService.show(SectionFormComponent,{
      initialState: {
        section: {
          id: 0,
          name: ''
        }
      }
    });

    modal.content.save.subscribe((section:SectionModel)=>{
      this.store.dispatch(new SectionCreated({section}));
      modal.hide();
    });
  }

  onEdit(oldSection: SectionModel) {
    let modal = this.modalService.show(SectionFormComponent,{
      initialState: {section: oldSection}
    });

    modal.content.save.subscribe((section:SectionModel)=>{
      this.store.dispatch(new SectionSaved({section}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Section?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new SectionDeleted({id}));
      }
    });
  }

}
