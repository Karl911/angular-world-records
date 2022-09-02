import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class ApiService {

  constructor(private http : HttpClient) { }

  // add product
  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }
  // get all products
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  // update a product
  putProduct(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/productList/"+id, data);
  }
  // delete a product
  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id); 
  }
    
}
