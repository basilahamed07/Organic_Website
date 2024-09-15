// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Toast {
  type: 'success' | 'danger' | 'warning';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  showToast(toast: Toast) {
    const toasts = this.toastsSubject.value;
    this.toastsSubject.next([...toasts, toast]);
  }

  removeToast(index: number) {
    const toasts = this.toastsSubject.value;
    toasts.splice(index, 1);
    this.toastsSubject.next([...toasts]);
  }
}
