import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-control-panel',
    standalone: true,
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
    // recibe el estado actual desde Padre
    @Input() status: 'RUNNING' | 'STOPPED' | 'ERROR' = 'STOPPED';

    // eventos para notificar al Padre las acciones del usuario
    @Output() start = new EventEmitter<void>();
    @Output() stop = new EventEmitter<void>();

    // métodos que se ejecutan al hacer clic en los botones
    onStart(): void {
        this.start.emit();
    }

    onStop(): void {
        this.stop.emit();
    }
}