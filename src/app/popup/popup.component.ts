import { Component, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-popup',
  template: `
  <h1>Muestras de cierra de ventana</h1>
  <button (click)="abrirPopUp()">Cerrar ventana</button>
`

})
export class PopupComponent {
  // Al cerrar el pop de todas maneras el navegador le preguntara si quiere cerrar la ventana
  
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    // Cancela el evento de cierre
    event.preventDefault();
    // Muestra el cuadro de diálogo de confirmación
    event.returnValue = '¿Estás seguro de que deseas abandonar esta página?';
  }
  
  private popUpWindow: Window | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  // abre un pop up que avisa al usuario que esta cerrando sin terminar el flujo del trabajo
  abrirPopUp() {
    //medidas del pop up
    this.popUpWindow = window.open('', '_blank', 'width=500,height=200');
    //contenido del pop up
    const contenidoPopup = '<h1>Aún no finalizas completamente el flujo de enrolamiento, ¿Deseas salir?</h1><button id="cerrarPopup">Cerrar pestaña</button>';

    if (this.popUpWindow) {
      const popupDocument = this.popUpWindow.document;
      popupDocument.write(contenidoPopup);
      popupDocument.close();
// cierra el pop up
      const cerrarPopupButton = popupDocument.getElementById('cerrarPopup');
      this.renderer.listen(cerrarPopupButton, 'click', () => {
        this.popUpWindow!.close();
        window.close();
      });
    }
  }

}
