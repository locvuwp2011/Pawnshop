import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
    prefixModule: string = 'order-management'
    $triggerReloadOrderList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() { }

    triggerReloadOrderList(reload: boolean){
        return this.$triggerReloadOrderList.next(reload);
    }
}