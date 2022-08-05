import { Injectable } from '@angular/core';
import {Toast, ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  constructor(private toast: ToastrService) { }

  success(title: string, message: string){
    return this.toast.success(message, title, {
      closeButton:true,
      });
  }

  error(title: string, message: string){
    return this.toast.error(message, title, {
      closeButton:true,
      });
  }
}
