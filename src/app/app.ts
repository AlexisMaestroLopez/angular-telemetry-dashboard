import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { MachineService } from './machine.service';
import { MachineState } from './machine-state.interface';

import { ControlPanelComponent } from './control-panel.component';
import { TelemetryDisplayComponent } from './telemetry-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ControlPanelComponent, 
    TelemetryDisplayComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // inyección del servicio con inject() — se resuelve antes de que se
  // evalúen los inicializadores de los demás campos de la clase
  private machineService = inject(MachineService);

  // estado del Padre como signal: se actualiza sólo con cada emisión del servicio
  machineState = toSignal(this.machineService.getMachineStatus(), {
    initialValue: {
      temperature: 45,
      rpm: 1200,
      status: 'STOPPED'
    } as MachineState
  });

  // manejadores para responder a las emisiones del ControlPanelComponent
  handleStart(): void {
    this.machineService.startMachine();
  }

  handleStop(): void {
    this.machineService.stopMachine();
  }
}