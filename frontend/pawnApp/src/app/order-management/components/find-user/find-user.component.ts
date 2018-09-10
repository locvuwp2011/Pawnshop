import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss']
})
export class FindUserComponent implements OnInit {
  @Output() fireEvent = new EventEmitter<any>();

  ddFindOptionValue: string = '';
  txtFindValue: string = '';
  userResults: any = null;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  openFindDialog(){
    this.txtFindValue = this.ddFindOptionValue = '';
  }

  find_click() {

    this.userService.findUser(this.txtFindValue, this.ddFindOptionValue).subscribe(searchResult => {
      this.userResults = <User[]>searchResult;
    })
  }

  pickUser(userSelected: User) {
    this.fireEvent.emit(userSelected);
  }

}
