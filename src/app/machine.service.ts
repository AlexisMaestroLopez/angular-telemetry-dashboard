import { Injectable, inject, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MachineState } from './machine-state.interface';

@Injectable({
    providedIn: 'root'
})
export class MachineService {
    private ngZone = inject(NgZone);

    // estado inicial de la máquina
    private initialState: MachineState = {
        temperature: 45,
        rpm: 1200,
        status: 'STOPPED'
    }

    // subject para estado actual
    private machineState$ = new BehaviorSubject<MachineState>(this.initialState)

    // variable para guardar temporizador
    private timerId: any = null;

    // método público para los componentes
    getMachineStatus(): Observable<MachineState> {
        return this.machineState$.asObservable();
    }

    // método para arrancar la máquina
    startMachine(): void {
        const currentState = this.machineState$.getValue();

        // si ya estaba en funcionamiento, evitamos duplicar temporizadores
        if (currentState.status === 'RUNNING') return;

        // cambiamos el estado a RUNNING
        this.machineState$.next({
            ...currentState,
            status: 'RUNNING'
        })

        // Iniciamos el temporizador
        if (!this.timerId) {
            this.timerId = setInterval(() => {
                this.ngZone.run(() => {
                    this.updateTelemetry();
                });
            }, 2000)
        }
    }

    // método para detener la máquina
    stopMachine(): void {
        // limpiamos el temporizador para detener la emisión
        if(this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }

        // emitimos el nuevo estado con STOPPED
        const currentState = this.machineState$.getValue();
        this.machineState$.next({
            ...currentState,
            status: 'STOPPED'
        });
    }

    private updateTelemetry(): void {
        const current = this.machineState$.getValue();

        // si la máquina no está en marcha, salimos del método
        if (current.status !== 'RUNNING') return;

        // simulamos variaciones
        const tempVar = (Math.random() * 8) - 4;
        const rpmVar = Math.floor((Math.random()) * 100) - 50;

        // calculamos nuevos valores con límites de seguridad
        const newTemp = Math.max(20, Math.min(95, Math.round(current.temperature + tempVar)));
        const newRpm = Math.max(0, Math.min(3500, current.rpm + rpmVar));

        // si la temperatura supera los 85 grados, se simulará un fallo
        let newStatus: 'RUNNING' | 'ERROR';

        if (newTemp > 85) {
            newStatus = 'ERROR';
        }
        else {
            newStatus = 'RUNNING';
        }

        // emitimos nuevo estado
        this.machineState$.next({
            temperature: newTemp,
            rpm: newRpm,
            status: newStatus
        });

        // si hay un error, limpiamos el temporizador
        if (newStatus === 'ERROR') {
            this.stopMachine();
            this.machineState$.next({
                ...this.machineState$.getValue(),
                status: 'ERROR'
            });
        }
    }
}