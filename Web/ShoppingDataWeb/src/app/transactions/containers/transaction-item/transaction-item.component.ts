import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromModels from '../../../shared/models';
import { BsModalService } from 'ngx-bootstrap';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import { ConfirmModalService } from '../../../shared/components/confirm-modal/confirm-modal.service';
import * as fromTransactionStore from '../../store';
import * as fromMaintenance from '../../../maintenance/store';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandFormComponent } from '../../../maintenance/brand/components/brand-form/brand-form.component';
import { TagFormComponent } from '../../../maintenance/tags/components/tag-form/tag-form.component';
import { SectionFormComponent } from '../../../maintenance/section/components/section-form/section-form.component';
import { ProductFormComponent } from '../../../maintenance/product/components/product-form/product-form.component';
import { TypeFormComponent } from '../../../maintenance/type/components/type-form/type-form.component';

@Component({
  selector: 'sd-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {

  transaction$: Observable<fromModels.TransactionModel>;
  tags: fromModels.TagModel[];
  products: fromModels.ProductListModel[];
  brands: fromModels.BrandModel[];
  sections: fromModels.SectionModel[];
  types: fromModels.TypeModel[];

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.transaction$ = this.store.pipe(select(fromTransactionStore.getCurrentTransactionItem));
    this.store.pipe(select(fromMaintenance.getTagEntities), tap(x => this.tags = x)).subscribe();
    this.store.pipe(select(fromMaintenance.getBrandEntities), tap(x => this.brands = x)).subscribe();
    this.store.pipe(select(fromMaintenance.getProductEntities), tap(x => this.products = x)).subscribe();
    this.store.pipe(select(fromMaintenance.getSectionEntities), tap(x => this.sections = x)).subscribe();
    this.store.pipe(select(fromMaintenance.getTypeEntities), tap(x => this.types = x)).subscribe();
  }

  onAddThing(type: string) {
    let modal;
    switch (type) {
      case 'brand':
        modal = this.modalService.show(BrandFormComponent, {
          initialState: {
            brand: {
              id: 0,
              name: ''
            }
          }
        });
        modal.content.save.subscribe((brand: fromModels.BrandModel) => {
          this.store.dispatch(new fromMaintenance.BrandCreated({ brand }));
          modal.hide();
        });
        break;
      case 'tag':
        modal = this.modalService.show(TagFormComponent, {
          initialState: {
            tag: {
              id: 0,
              name: ''
            }
          }
        });
        modal.content.save.subscribe((tag: fromModels.TagModel) => {
          this.store.dispatch(new fromMaintenance.TagCreated({ tag }));
          modal.hide();
        });
        break;
      case 'product':
        modal = this.modalService.show(ProductFormComponent, {
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
        modal.content.save.subscribe((product: fromModels.ProductUpdateModel) => {
          this.store.dispatch(new fromMaintenance.ProductCreated({ product }));
          modal.hide();
        });
        break;
      case 'section':
        modal = this.modalService.show(SectionFormComponent, {
          initialState: {
            section: {
              id: 0,
              name: ''
            }
          }
        });
        modal.content.save.subscribe((section: fromModels.SectionModel) => {
          this.store.dispatch(new fromMaintenance.SectionCreated({ section }));
          modal.hide();
        });
        break;
      case 'type':
          modal = this.modalService.show(TypeFormComponent, {
            initialState: {
              type: {
                id: 0,
                name: ''
              }
            }
          });
          modal.content.save.subscribe((type: fromModels.TypeModel) => {
            this.store.dispatch(new fromMaintenance.TypeCreated({ type }));
            modal.hide();
          });
        break;
      default:
        break;
    }
  }


  onSave(transaction: fromModels.TransactionModel) {
    console.log(transaction);
    this.store.dispatch(new fromTransactionStore.TransactionItemSaved({ transaction }));
  }


  onCreate(transaction: fromModels.TransactionModel) {
    console.log(transaction);
    this.store.dispatch(new fromTransactionStore.TransactionItemCreated({ transaction }));
  }

  onCancel() {
    this.router.navigateByUrl('transactions/list');
  }

}
