import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    // Cancela el evento de cierre
    event.preventDefault();
    // Muestra el cuadro de diálogo de confirmación
    event.returnValue = '¿Estás seguro de que deseas abandonar esta página?';
  }
  
  cerrarVentana(){
    window.close();
  }

}
