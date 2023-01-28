import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSelect,} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.scss'],
})
export class Tab1Component implements OnInit {

  constructor() { }

  ngOnInit() {}

}

@Component({
  selector: 'app-tab1',
  templateUrl: 'example.component.html',
})

export class ExampleComponent {
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

//  onWillDismiss(event: Event) {
//    const ev = event as CustomEvent<OverlayEventDetail<string>>;
//    if (ev.detail.role === 'confirm') {
//      this.message = `Hello, ${ev.detail.data}!`;
//    }
//  }
}