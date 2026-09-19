import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineState } from './machine-state.interface';

@Component({
    selector: 'app-telemetry-display',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './telemetry-display.component.html',
    styleUrls: ['./telemetry-display.component.css']
})
export class TelemetryDisplayComponent {
    // recibe todo el objeto de estado de la máquina desde el Padre
    @Input() data: MachineState = {
        temperature: 0,
        rpm: 0,
        status: 'STOPPED'
    };
}