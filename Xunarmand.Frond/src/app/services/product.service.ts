import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {connect, map, Observable, observable} from "rxjs";
import {ProductResponse} from "../interfaces/product-response";
import {ProductRequest} from "../interfaces/product-request";
import {RegisterResponse} from "../interfaces/register-response";
import {ProductComponent} from "../pages/product/product.component";
import {ProductId} from "../interfaces/product-id";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  product(p: {}): Observable<any> {
    return this.http.get<ProductResponse>( 'http://xunarmand.uz/api/product?Filter.PageSize=100&Filter.PageToken=1').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  productID(ProductId: string | null): Observable<any> {
    return this.http.get<ProductResponse>( 'http://xunarmand.uz/api/product/' + ProductId).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  deleteProduct(ProductId: string | null): Observable<any> {
    return this.http.delete<ProductResponse>( 'http://xunarmand.uz/api/product/' + ProductId).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}



