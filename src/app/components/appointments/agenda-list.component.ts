import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { format, parseISO } from 'date-fns';

@Component({
    selector: 'app-agenda-list',
    standalone: true,
    imports: [CommonModule, AccordionModule, PanelModule],
    templateUrl: './agenda-list.component.html',
    styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {
    compromissosAgrupados: { [data: string]: Appointment[] } = {};

    constructor(private appointmentService: AppointmentService) { }

    ngOnInit(): void {
        this.appointmentService.getAppointments().subscribe({
            next: (compromissos) => {
                this.compromissosAgrupados = this.agruparPorData(compromissos);
            },
            error: (err) => console.error('Erro ao carregar compromissos:', err)
        });
    }

    agruparPorData(compromissos: Appointment[]): { [data: string]: Appointment[] } {
        const agrupados: { [data: string]: Appointment[] } = {};

        for (const compromisso of compromissos) {
            const data = format(parseISO(compromisso.dateTime), 'yyyy-MM-dd');
            if (!agrupados[data]) {
                agrupados[data] = [];
            }
            agrupados[data].push(compromisso);
        }

        return agrupados;
    }

    objectKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    formatarHora(isoString: string): string {
        return format(parseISO(isoString), 'HH:mm');
    }
}
