import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap';
import { AppState } from '../../../../store/reducers';
import { Observable } from 'rxjs';
import * as fromModels from '../../../../shared/models';
import * as fromStore from '../../../store';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sd-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products$: Observable<fromModels.ProductListModel[]>;
  brands$: Observable<fromModels.BrandModel[]>;
  types$: Observable<fromModels.TypeModel[]>;
  sections$: Observable<fromModels.SectionModel[]>


  brands: fromModels.BrandModel[] = [];
  types: fromModels.TypeModel[] = [];
  sections: fromModels.SectionModel[]=[];

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.products$ = this.store.pipe(select(fromStore.getProductEntities));
    this.brands$ = this.store.pipe(
      select(fromStore.getBrandEntities),
      tap(x=>this.brands=x)
    );
    this.types$ = this.store.pipe(
      select(fromStore.getTypeEntities),
      tap(x=>this.types=x)
    );
    this.sections$ = this.store.pipe(
      select(fromStore.getSectionEntities),
      tap(x=>this.sections=x)
    );
    this.brands$.subscribe();
    this.sections$.subscribe();
    this.types$.subscribe();
  }

  onCreate() {
    let modal = this.modalService.show(ProductFormComponent,{
      initialState: {
        brands: this.brands,
        types: this.types,
        sections: this.sections,
        product: {
          id: 0,
          name: '',
          brandId: null,
          sectionId: null,
          typeId: null
        }
      }
    });

    modal.content.save.subscribe((product:fromModels.ProductCreateModel)=>{
      this.store.dispatch(new fromStore.ProductCreated({product}));
      modal.hide();
    });
  }

  onEdit(oldProduct: fromModels.ProductUpdateModel) {
    let modal = this.modalService.show(ProductFormComponent,{
      initialState: {
        brands: this.brands,
        types: this.types,
        sections: this.sections,
        product: oldProduct
      }
    });

    modal.content.save.subscribe((product:fromModels.ProductUpdateModel)=>{
      this.store.dispatch(new fromStore.ProductSaved({product}));
      modal.hide();
    });
  }

  onDelete(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this Product?',false).subscribe(result=>{
      if(result === ConfirmResult.Yes) 
      {
        this.store.dispatch(new fromStore.ProductDeleted({id}));
      }
    });
  }

}
