import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators'

// MODELS
import { Transaction } from '../models/transaction.model';

// INTERFACES
import { LoadTransactions } from '../interfaces/load-transaction.interface';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  public transaction!: Transaction;

  constructor( private http: HttpClient) { }

  /** ================================================================
   *   LOAD TRANSACTIONS
  ==================================================================== */
  cargarTransactions(desde: number = 0, limite: number = 1000){
    
    const endPoint = `/transactions?desde=${desde}&limite=${limite}`;
    return this.http.get<LoadTransactions>(`${base_url}${endPoint}`)
            .pipe(
              delay(500),
              map( resp => {
                return resp;
              })
            );

  }

  /** ================================================================
   *   SEARCH TRANSACTIONS DATE
  ==================================================================== */
  cargarTransactionsDate(initial: Date, end: Date){
    
    const endPoint = `/transactions/date?initial=${initial}&end=${end}`;
    return this.http.get<LoadTransactions>(`${base_url}${endPoint}`)
            .pipe(
              delay(500),
              map( resp => {
                return resp;
              })
            );
  }

  /** ================================================================
   *   CREATE TRANSACTION
  ==================================================================== */
  createTransaction( data: any ){
    return this.http.post(`${base_url}/transactions`, data);
  }

}
