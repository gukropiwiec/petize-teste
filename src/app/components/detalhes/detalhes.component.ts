import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { IPessoa } from '../../interfaces/pessoa.interface';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  id: string;
  pessoa!: IPessoa | undefined;
  loading = true;
  whatsAppURL = `https://wa.me?text=${encodeURIComponent('Pessoa desaparecida!')}`;
  facebookURL = `${window.location.href}`

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService<IPessoa>, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPessoa();
  }

  async getPessoa() {
    try {
      this.pessoa = await lastValueFrom(this.httpService.getOne(this.id));
      const whatsAppText = `Pessoa desaparecida! Ajuda a encontrar ${this.pessoa.nome}. Idade: ${this.pessoa.idade}. Sexo: ${this.pessoa.sexo}. Local desaparecimento: ${this.pessoa.ultimaOcorrencia.localDesaparecimentoConcat || 'Não informado'}. Link para foto: ${this.pessoa.urlFoto}`;
      this.whatsAppURL = `https://wa.me?text=${encodeURIComponent(whatsAppText)}`;
    } catch (error) {
      this.pessoa = undefined;
    }
    this.loading = false;
  }
}
