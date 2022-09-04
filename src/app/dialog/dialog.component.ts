import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormControl, NgForm, Validators  } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA   } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  disableSelect = new FormControl(false);

  categories: Category[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  matcher = new MyErrorStateMatcher();

  worldRecordForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.worldRecordForm = this.formBuilder.group({
      
      category : ['', Validators.required],
      event : ['', Validators.required],
      name : ['', Validators.required],
      surname : ['', Validators.required],
      sex : ['', Validators.required],
      country : ['', Validators.required],
      performance : ['', Validators.required],
      date : ['', Validators.required],
      meeting : [''],
      location : ['']

    }) 

    //console.log(this.editData);
    if (this.editData) {
      this.actionBtn = "Update";
      this.worldRecordForm.controls['category'].setValue(this.editData.category);
      this.worldRecordForm.controls['event'].setValue(this.editData.event);
      this.worldRecordForm.controls['name'].setValue(this.editData.name);
      this.worldRecordForm.controls['surname'].setValue(this.editData.surname);
      this.worldRecordForm.controls['sex'].setValue(this.editData.sex);
      this.worldRecordForm.controls['country'].setValue(this.editData.country);
      this.worldRecordForm.controls['performance'].setValue(this.editData.performance);
      this.worldRecordForm.controls['date'].setValue(this.editData.date);
      this.worldRecordForm.controls['meeting'].setValue(this.editData.meeting);
      this.worldRecordForm.controls['location'].setValue(this.editData.location);
    }
  }

  addWorldRecord()  {
   if (!this.editData) {
    if (this.worldRecordForm.valid) {
      this.api.postWorldRecord(this.worldRecordForm.value)
      .subscribe({
        next:(res)=> {
          alert("Record enregistré !");
          this.worldRecordForm.reset();
          this.dialogRef.close('save');
        }, 
        error:()=> {
          alert("Erreur lors de l'enregistrement du record")
        }
      })
    }
   }
   else {
    this.updateWorldRecord();
  }
  //console.log(this.worldRecordForm.value);
  }

  updateWorldRecord(){
     this.api.putWorldRecord(this.worldRecordForm.value, this.editData.id)
     .subscribe({
      next:(res)=> {
        alert("Modification du record effectué");
        this.worldRecordForm.reset();
        this.dialogRef.close('update');
      }, 
      error:()=> {
        alert("Erreur lors de la modification du record ")
      }
    }) 
  }
}
