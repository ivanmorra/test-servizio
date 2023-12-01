import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService, HttpClient]

})
export class AppComponent implements OnInit{
  title = 'progetto-tabella';
  @ViewChild('modalDettaglio') modalDettaglio!: ElementRef
  @ViewChild('modalInserimento')  modalInserimento!: ElementRef;
  dettaglioUtente: any;
  formInserimento!: FormGroup;
   
  utenti = [
    {
      nome: 'Ivan',
      cognome: 'Morra',
      anni: 23,
      citta: 'San giorgio',
      coloreCapelli: 'neri',
      codicefiscale: 'ivmrr08785'
    },
    {
      nome: 'Giovanni',
      cognome: 'Morra',
      anni: 50,
      citta: 'Fuorigrotta',
      coloreCapelli: 'Neri',
      codicefiscale: 'giomrr5647'
    },
    {
      nome: 'Simone',
      cognome: 'Morra',
      anni: 21,
      citta: 'San giorgio',
      coloreCapelli: 'neri',
      codicefiscale: 'smmrr08785'
    },
    {
      nome: 'Tamara',
      cognome: 'Riccio',
      anni: 48,
      citta: 'San giorgio',
      coloreCapelli: 'Catsani',
      codicefiscale: 'tmrrc86534'
    }
  ];
   
  arrayListaServer = [
    {
      fattureIpaId: 0,
      codice: '',
      denominazione: ''
     }
    
  ]
    
      
    
  


  utentiFilter =  [...this.utenti];
   
  constructor(private fb: FormBuilder, private modalService: NgbModal, private restService: AppService){
    
    this.formInserimento = this.fb.group(
      {
        nome: new FormControl(''),
        cognome: new FormControl(''),
        anni: new FormControl(''),
        citta: new FormControl(''),
        coloreCapelli: new FormControl(''),
        codicefiscale: new FormControl(''),
      }
    )
    

    let arrayFiltro: any[] = [];
    
    console.log("array lista sever>>", this.arrayListaServer)
    this.restService.listIpa().then(
      res => {
        this.arrayListaServer = res.ipaBindList;
        console.log("array lista sever2>>", this.arrayListaServer)
      }
    );
   

  }
   vediTerzaLettera(valore:string){ 
    console.log(valore[2]);
    if(valore[2]=="h"){
      console.log("HAI VINTO");
    } else{
      console.log(valore[2])
    }
   }

  ngOnInit(): void {
    
  }


  apriDettaglioUtente(user: any){
    this.dettaglioUtente = user;
    this.modalService.open(this.modalDettaglio, {size: 'lg'});
  }
  apriModaleInserimento(){
    this.modalService.open(this.modalInserimento, {size: 'lg'});
  
  }

  filtraPerNome(testo:String){
    console.log(testo);
    if(testo==""){
      this.utenti = this.utentiFilter;
    } else{
      this.utenti = this.utentiFilter.filter(ut => ut.nome.toLowerCase().includes(testo.toLowerCase()));
    };

  }

    filtraPerCognome(testo:string){
      console.log(testo);
      if(testo==""){
        this.utenti = this.utentiFilter;
      } else{
        this.utenti = this.utentiFilter.filter(ut => ut.cognome.toLowerCase().includes(testo.toLowerCase()));
      };


  }

  filtraPerAnni(testo:String){
    console.log(testo);
    if(testo==""){
      this.utenti = this.utentiFilter;
    } else{
      this.utenti = this.utentiFilter.filter(ut => ut.nome.toLowerCase().includes(testo.toLowerCase()));
    };

  }


  

  SalvaDati(){
    console.log(this.formInserimento.value);
    this.utenti.push(
      {
         nome: this.formInserimento.value.nome,
         cognome:this.formInserimento.value.cognome,
         anni: this.formInserimento.value.anni,
         citta: this.formInserimento.value.citta,
         coloreCapelli:this.formInserimento.value.coloreCapelli,
         codicefiscale:this.formInserimento.value.codicefiscale,
      }
    )
  }
  



}




