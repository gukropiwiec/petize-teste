import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { HttpService } from '../../services/http.service';
import { IPessoa } from '../../interfaces/pessoa.interface';
import { lastValueFrom } from 'rxjs';
import { IGetPessoasResponse } from '../../interfaces/getpessoasresponse.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, MatPaginatorModule, MatDividerModule, MatSelectModule, MatSortModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns = ['id', 'nome', 'idade', 'sexo', 'urlFoto'];
  pessoas: IPessoa[] = [];
  dataSource!: MatTableDataSource<IPessoa>;
  page = 0;
  totalPages = 0;
  currentNome = '';
  currentSexo = '';
  currentIdade = '';
  constructor(private httpService: HttpService<IGetPessoasResponse>) {}

  ngOnInit(): void {
    this.getData(this.page);
  }

  async getData(page: number, nome = '', sexo = '', idade = '') {
    this.currentNome = nome;
    if (sexo == 'NONE') {
      this.currentSexo = ''
    }
    this.currentSexo = sexo;
    this.currentIdade = idade;
    console.log(this.currentNome)
    const getPessoasEndpoint = `aberto/filtro?faixaIdadeFinal=${this.currentIdade}&faixaIdadeInicial=${this.currentIdade}&nome=${this.currentNome}&porPagina=12&sexo=${this.currentSexo}&status=DESAPARECIDO&pagina=${page}`;
    const response = await lastValueFrom(this.httpService.get(getPessoasEndpoint));
    console.log(response);
    this.dataSource = new MatTableDataSource(response.content);
    this.totalPages = response.totalPages;
    this.page = response.pageable.pageNumber;
    this.dataSource.sort = this.sort;
  }

  changePage(event: any) {
    this.getData(event.target.value);
  }

  openPessoaId(id: number) {
    console.log(id)
  }
}
