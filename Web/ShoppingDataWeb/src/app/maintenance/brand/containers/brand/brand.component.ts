import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import { BrandModel } from '../../../../shared/models';
import { getBrandEntities, BrandCreated, BrandSaved, BrandDeleted } from '../../../store';
import { BrandFormComponent } from '../../components/brand-form/brand-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'sd-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands$: Observable<BrandModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.brands$ = this.store.pipe(select(getBrandEntities));
  }

  onCreate() {
    let modal = this.modalService.show(BrandFormComponent,{
      initialState: {
        brand: {
          id: 0,
          name: ''
        }
      }
    });

    modal.content.save.subscribe((brand:BrandModel)=>{
      this.store.dispatch(new BrandCreated({brand}));
      modal.hide();
    });
  }

  onEdit(oldBrand: BrandModel) {
    let modal = this.modalService.show(BrandFormComponent,{
      initialState: {brand: oldBrand}
    });

    modal.content.save.subscribe((brand:BrandModel)=>{
      this.store.dispatch(new BrandSaved({brand}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Brand?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new BrandDeleted({id}));
      }
    });
  }

}
