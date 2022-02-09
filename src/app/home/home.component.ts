import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LanguageApp  } from '../models/datatable.span';
import * as XLSX from 'xlsx';

// MODELS
import { Transaction } from '../models/transaction.model';

// SERVICES
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnDestroy, OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(  private transactionsService: TransactionsService) { }

  ngOnInit(): void {

    this.dtOptions = {
      language: LanguageApp.spanish_datatables,
      order: [[ 0, "desc" ]]
    };

    // CARGAR Transactions
    this.cargarTransactions();  
    

  }

  /** ================================================================
   *   CARGAR TRANSACTIONS
  ==================================================================== */
  public transactionsList: Transaction[] = [];
  public total: number = 0;  
  cargarTransactions(){
    
    this.transactionsService.cargarTransactions()
        .subscribe( ({ total, transactions }) => {
          
          this.transactionsList = transactions;
          this.total = total;

          this.dtTrigger.next('');

        });

  }

  /** ================================================================
   *   CREATE TRANSACTIONS
  ==================================================================== */
  @ViewChild('newcode') newcode!: ElementRef;
  public disabled: boolean = false;
  
  public newTransaction: Transaction = {
    codigo: '',
    referencia: '',
    valor: 0
  }

  createTransaction(code: any){

    this.newcode.nativeElement.value = '';

    // DATA     
    this.newTransaction.codigo= code.slice(0, 18);
    this.newTransaction.referencia= code.slice(18, 28);
    this.newTransaction.xxx= code.slice(28, 35);
    this.newTransaction.valor= Number(code.slice(35, -10));
    this.newTransaction.aaa= code.slice(-10, -8);

    this.transactionsService.createTransaction(this.newTransaction)
        .subscribe((resp: any) => {
          
         
          this.newcode.nativeElement.onFocus = true;
          this.transactionsList.push(resp.transaction);
                   
        }, (err) => { 
          Swal.fire('Error', err.error.msg, 'error');          
          this.newcode.nativeElement.onFocus = true;
        });   

  }

  // ON DESTROY
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // EXPORTAR EXCEL
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
