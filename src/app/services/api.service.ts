import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) 
export class ApiService {

  constructor(private http : HttpClient) { }

  // add a world record
  postWorldRecord(data : any){
    return this.http.post<any>("http://localhost:3000/worldRecordList/", data);
  }
  // get all world records
  getWorldRecords(){
    return this.http.get<any>("http://localhost:3000/worldRecordList/");
  }
  // update a world record
  putWorldRecord(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/worldRecordList/"+id, data);
  }
  // delete a world record
  deleteWorldRecord(id : number){
    return this.http.delete<any>("http://localhost:3000/worldRecordList/"+id); 
  }
    
}
