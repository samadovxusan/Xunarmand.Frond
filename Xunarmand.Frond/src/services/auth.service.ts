import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {LoginRequest} from "../app/interfaces/login-request";
import {catchError, map, Observable, throwError} from "rxjs";
import {LoginResponse} from "../app/interfaces/login-response";
import {Router} from "@angular/router";
import {RegisterRequest} from "../app/interfaces/register-request";
import {RegisterResponse} from "../app/interfaces/register-response";
import {Sendmessage} from "../app/interfaces/sendmessage";
import {SendmessageRespons} from "../app/interfaces/sendmessage-respons";
import {CreateProduct} from "../app/interfaces/CreateProduct";
import {AddProductRespons} from "../app/interfaces/add-product-respons";
import {ProductResponse} from "../app/interfaces/product-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}
  apiUrl = environment.apiUrl;
  tokenKey : string = 'token';
  router =  inject(Router);

  login(data :LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}auth/login`,data).pipe(
      map((response: LoginResponse) => {
         localStorage.setItem(this.tokenKey, response.token);
        return response;
      }));
  }
  register(data :RegisterRequest): Observable<RegisterResponse>{

    return this.http.post<RegisterResponse>(`${this.apiUrl}auth/register`,data).pipe(
      map((response: RegisterResponse) => {

        return response;
      }));
  }
  addproduct(data :CreateProduct): Observable<any>{
    var createProduct = data;
    console.log('->>>>>>>', createProduct);
    return this.http.post<any>(`http://xunarmand.uz/api/product/product${createProduct}`, createProduct).pipe(
      map ((response: any) => {
        console.log(response);
        return response;
      }));
  }


    // Foydalanuvchi ma'lumotlarini saqlash funksiyasi
  saveUserData(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }


  // Saqlangan foydalanuvchi ma'lumotlarini olish funksiyasi
  getUserData() {
    const userData = localStorage.getItem('user'); // yoki boshqa joy
    if (userData) {
      return JSON.parse(userData);
    }
    return null; // yoki kerakli xato xabari
  }


  // Foydalanuvchini tizimdan chiqish funksiyasi
  logout() {
    localStorage.removeItem('token');
  }

  sendmessage(data: string): Observable<any> {
    return this.http.post<any>(`http://xunarmand.uz/api/sendtgbot/message?str=${data}`, data).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      }),
    );
  }
  imageurl(data: any): Observable<any> {
    return this.http.get<ProductResponse>( 'http://xunarmand.uz/api/imagepath/imageurl' + data).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }



}
