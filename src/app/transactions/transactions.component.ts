import { Component, ElementRef, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { Subject } from 'rxjs';

import Swal from 'sweetalert2';
import { LanguageApp  } from '../models/datatable.span';
import * as XLSX from 'xlsx';

// MODELS
import { Transaction } from '../models/transaction.model';

// SERVICES
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styles: [
  ]
})
export class TransactionsComponent implements OnInit, OnDestroy, OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(  private transactionsService: TransactionsService) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LanguageApp.spanish_datatables,
      order: [[ 0, "desc" ]]
    };

    // CARGAR ULTIMAS TRANSACCIONES
    this.cargarTransactions();

  }

  /** ================================================================
   *   CARGAR TRANSACTIONS
  ==================================================================== */
  public transactionsList: Transaction[] = [];
  public transactionsListTemp: Transaction[] = [];
  public total: number = 0;  
  cargarTransactions(){
    
    this.transactionsService.cargarTransactions()
        .subscribe( ({ total, transactions }) => {
          
          this.transactionsList = transactions;
          this.transactionsListTemp = transactions;
          this.total = total;

          this.dtTrigger.next('');

        });

  }

  /** ================================================================
   *   SEARCH TRANSACTIONS
  ==================================================================== */
  buscarTrasacciones(initial:any, end:any){

    this.transactionsList = [];
    this.total = 0;

    this.transactionsService.cargarTransactionsDate(initial, end)
        .subscribe( ({total, transactions}) => {

          this.transactionsList = transactions;
          this.total = total;

        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** ================================================================
   *   ON DESTROY
  ==================================================================== */
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /** ================================================================
   *   EXPORTAR EXCEL
  ==================================================================== */
  exportar(){

    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(this.transactionsList);
      
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transacciones");

    /* title */
    let title = 'Listado.xls';

    /* write workbook and force a download */
    XLSX.writeFile(wb, title);

  }

  // FIN DE LA CLASE

}
