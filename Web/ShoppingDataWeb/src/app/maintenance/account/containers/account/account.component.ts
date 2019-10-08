import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListModel } from '../../../../shared/models';
import { BsModalService } from 'ngx-bootstrap';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import { ConfirmModalService } from '../../../../shared/components/confirm-modal/confirm-modal.service';
import { getUserEntities, UserCreated, UserSaved, UserDeleted, getUserSavedSuccess } from '../../../../maintenance/store';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { ConfirmResult } from '../../../../shared/components/confirm-modal/confirm-modal/confirm-modal.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {



  users$: Observable<UserListModel[]>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() {
    this.users$ = this.store.pipe(select(getUserEntities));
  }

  addUser() {
    let modal = this.modalService.show(UserFormComponent, {
      initialState: {
        user: {
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          isAdmin: false,
          userName: '',
          password: '',
          confirmPassword: ''
        }
      }
    });

    modal.content.save.subscribe((user: UserListModel) => {
      this.store.pipe(
        select(getUserSavedSuccess),
        tap(x => {
          if (x) {
            modal.hide();
          }
        })
      ).subscribe();
      this.store.dispatch(new UserCreated({ user }));
    });
  }

  editUser(oldUser: UserListModel) {
    let modal = this.modalService.show(UserFormComponent, {
      initialState: { user: oldUser }
    });

    modal.content.save.subscribe((user: UserListModel) => {
      this.store.pipe(
        select(getUserSavedSuccess),
        tap(x => {
          if (x) {
            modal.hide();
          }
        })
      ).subscribe();
      this.store.dispatch(new UserSaved({ user }));
    });
  }

  deleteUser(id: number) {
    this.confirmModalService.show('Are you sure you want to delete this User?', false).subscribe(result => {
      if (result === ConfirmResult.Yes) {
        this.store.dispatch(new UserDeleted({ id }));
      }
    });
  }

}
