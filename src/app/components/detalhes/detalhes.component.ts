import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService<IPessoa>) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPessoa();
  }

  async getPessoa() {
    try {
      this.pessoa = await lastValueFrom(this.httpService.getOne(this.id));
    } catch (error) {
      this.pessoa = undefined;
    }
    this.loading = false;
  }
}
