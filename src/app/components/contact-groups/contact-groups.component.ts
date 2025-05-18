import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupService, Group } from '../../services/group.service';

@Component({
  selector: 'app-contact-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.css']
})
export class ContactGroupsComponent implements OnInit {
  grupos: Group[] = [];
  novoGrupo: string = '';
  grupoEditando: Group | null = null;
  grupoEditado: string = '';

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.carregarGrupos();
  }

  carregarGrupos(): void {
    this.groupService.getGroups().subscribe({
      next: (dados) => this.grupos = dados,
      error: (err) => console.error('Erro ao carregar grupos:', err)
    });
  }

  adicionarGrupo(): void {
    const nomeLimpo = this.novoGrupo.trim();
    const nomeExiste = this.grupos.some(g => g.name.toLowerCase() === nomeLimpo.toLowerCase());

    if (nomeLimpo && !nomeExiste) {
      this.groupService.addGroup(nomeLimpo).subscribe({
        next: () => {
          this.carregarGrupos();
          this.novoGrupo = '';
        },
        error: (err) => console.error('Erro ao adicionar grupo:', err)
      });
    }
  }

  iniciarEdicao(grupo: Group): void {
    this.grupoEditando = grupo;
    this.grupoEditado = grupo.name;
  }

  salvarEdicao(): void {
    const nomeNovo = this.grupoEditado.trim();
    const nomeExiste = this.grupos.some(g => g.name.toLowerCase() === nomeNovo.toLowerCase());

    if (this.grupoEditando && nomeNovo && !nomeExiste) {
      this.groupService.updateGroup(this.grupoEditando.id, nomeNovo).subscribe({
        next: () => {
          this.carregarGrupos();
          this.grupoEditando = null;
          this.grupoEditado = '';
        },
        error: (err) => console.error('Erro ao atualizar grupo:', err)
      });
    }
  }

  cancelarEdicao(): void {
    this.grupoEditando = null;
    this.grupoEditado = '';
  }

  removerGrupo(grupo: Group): void {
    this.groupService.deleteGroup(grupo.id).subscribe({
      next: () => this.carregarGrupos(),
      error: (err) => console.error('Erro ao remover grupo:', err)
    });
  }
}
