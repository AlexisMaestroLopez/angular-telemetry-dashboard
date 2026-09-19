export interface MachineState {
 temperature: number; // en grados Celsius
 rpm: number; // Revoluciones por minuto
 status: 'RUNNING' | 'STOPPED' | 'ERROR';
}