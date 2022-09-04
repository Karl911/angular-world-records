import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-products';
  displayedColumns: string[] = ['category', 'event','name','surname','genre','country','performance','date', 
  'meeting', 'location', 'action'];

  //selectedCategory: string;

/*   categories: Category[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ]; */
  dataSource!: MatTableDataSource<any >;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog, private api : ApiService) {
    
  }
  ngOnInit(): void {
    this.getAllWorldRecords();
  }
      openDialog() {
        this.dialog.open(DialogComponent, {
          width:'30%'
        })
    .afterClosed().subscribe(val=>{
        if (val ==='save') {
          this.getAllWorldRecords();
        }
    })
  }

  getAllWorldRecords(){
    this.api.getWorldRecords()
    .subscribe({ 
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize=15;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("Error while fetching the records");
      }
    })
  }

  editWorldRecord(row : any) {
    this.dialog.open(DialogComponent, {
      width : '30%',
      data : row 
    })
    .afterClosed().subscribe(val=>{
      if (val ==='update') {
        this.getAllWorldRecords();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteWorldRecord(id : number){
    this.api.deleteWorldRecord(id) 
    .subscribe({ 
      next:(res) => {
        alert("Delete word record successfuly");
        this.getAllWorldRecords();
      },
      error:(err) =>{
        alert("Error while fetching the records");
      }
    })
  }
}
