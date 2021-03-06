import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http} from '@angular/http';

/**
 * Generated class for the TambahKibDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-kib-d',
  templateUrl: 'tambah-kib-d.html',
})
export class TambahKibDPage {items : any = [];
   public form                   : FormGroup;
   public nama_aset              : any;
   public kode_aset              : any;
   public register               : any;
   public konstruksi                 : any;
   public panjang                   : any;
   public lebar                  : any;
   public luas                  : any;
   public tahun_pengadaan        : any;
   public tanggal_dokumen        :any;
   public nomor_dokumen        :any;
   public status_tanah           : any;
   public nomor_kode_tanah       : any;
   public asal_usul             : any;
   public harga                 : any;
   public keterangan            : any;
   public kondisi            : any;
   public kode_lokasi           : any;
    public lokasi : any;
 
 
 
  
   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : Http,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController,
               public navParams : NavParams,
               public loading: LoadingController)
   {
    this.load_aset();
   
 
 
 
      // Create form builder validation rules
      this.form = this.fb.group({

    
 
 
 
       "nama_aset"             :  ["", Validators.required],
       "kode_aset"             :  ["", Validators.required],
       "register"              :  ["", Validators.compose([Validators.minLength(5),Validators.maxLength(5),Validators.pattern("^[0-9]*$"), Validators.required])],

       "konstruksi"            :  ["", Validators.required],
       "panjang"               :  ["", Validators.required],
 
       "lebar"                 :  ["", Validators.required],
       "luas"                  :  ["", Validators.required],
       "tahun_pengadaan"       :  ["", Validators.compose([Validators.maxLength(4),Validators.minLength(4), Validators.min(1990), Validators.max(new Date().getFullYear()-1),
          Validators.required, Validators.pattern("^[0-9]*$")])],
     
       "tanggal_dokumen"       :  ["", Validators.compose([Validators.minLength(1), Validators.required])],

       "nomor_dokumen"         :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "status_tanah"          :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "nomor_kode_tanah"      :  ["", Validators.compose([Validators.minLength(1), Validators.required])],    
       "asal_usul"             :  ["", Validators.compose([Validators.minLength(5), Validators.required])],
       "lokasi"                :  ["", Validators.required],
       "harga"                 :  ["", Validators.compose([Validators.minLength(1), Validators.min(1), Validators.required])],
       "keterangan"            :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "kondisi"               :  ["", Validators.required],
       "kode_lokasi"           :  ["", Validators.required],
 
      });
   }
 
   load_aset(){
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
 
    loader.present().then(() => {
    this.http.get('http://192.168.1.1/api/api.php?command=AsetKibD')
    .timeout(15000)
    .map(res => res.json())
   .subscribe((success)=>{
    
    loader.dismiss()
   this.items=success
   console.log(this.items);
   },(error)=>{
      loader.dismiss();
      const toast = this.toastCtrl.create({
       message: "Error terdeteksi : "+error+". \n Harap hubungi bidang informasi",
       showCloseButton:true,
       closeButtonText:"Tutup",
       duration:10000
     });
     toast.present();
 
   });
 });
 }
 
   // Determine whether we adding or editing a record55555
   // based on any supplied navigation parameters
   ionViewWillEnter()
   {
 
   }
 
 
 
   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {


      this.nama_aset           = item.nama_aset;
      this.kode_aset           = item.kode_aset;
      this.register            = item.register;
      this.konstruksi            = item.konstruksi;
      this.panjang          =item.panjang,
      this.lebar         =item.lebar,
      this.luas                = item.luas;
      this.tahun_pengadaan     = item.tahun_pengadaan;
      this.tanggal_dokumen =item.tanggal_dokumen,
      this.nomor_dokumen       =item.nomor_dokumen;
       this.status_tanah   =item.status_tanah,
       this.nomor_kode_tanah=item.nomor_kode_tanah,
      this.asal_usul           = item.asal_usul;
      this.harga            = item.harga;
      this.keterangan       = item.keterangan;
      this.kondisi             =item.kondisi,
      this.kode_lokasi      = item.kode_lokasi;
      this.lokasi=item.lokasi;

   }
 
 
 
   // Save a new record that has been added to the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of create followed by the key/value pairs
   // for the record data
   createEntry(nama_aset,kode_aset, register,konstruksi,panjang,lebar,luas,tahun_pengadaan,tanggal_dokumen,nomor_dokumen,status_tanah,nomor_kode_tanah,
    asal_usul,harga,keterangan,kondisi,kode_lokasi,lokasi)
   {
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
     loader.present().then(() => {
       let fn_nama_aset=this.nama_aset.substring(0, this.nama_aset.indexOf("_"));
       
       this.http.get('http://192.168.1.1/api/api.php?command=TambahKibD&kode_aset='+this.kode_aset+'&register='+this.register+'&nama_aset='+fn_nama_aset+'&kondisi='+this.kondisi+
       '&konstruksi='+this.konstruksi+'&panjang='+this.panjang+'&lebar='+this.lebar+'&luas='+this.luas+
       '&tahun_pengadaan='+this.tahun_pengadaan+'&nomor_dokumen='+this.nomor_dokumen+'&tanggal_dokumen='+this.tanggal_dokumen+'&status_tanah='+
       this.status_tanah+'&nomor_kode_tanah='+this.nomor_kode_tanah+'&asal_usul='+this.asal_usul+'&harga='+this.harga+'&keterangan='+this.keterangan+'&kode_lokasi='+this.kode_lokasi+
       '&lokasi='+this.lokasi)
       .timeout(15000)
       .subscribe((success)=>{
       loader.dismiss();
       const toast = this.toastCtrl.create({
          message: "Sukses menambahkan asset",
         
          duration:2000
        });
        toast.present();
        this.navCtrl.pop();
        
      },(error)=>{
         console.log(error)
         loader.dismiss();
         const toast = this.toastCtrl.create({
          message: "Error terdeteksi : "+error+". \n Harap hubungi bidang informasi",
          
          duration:5000
        });
        toast.present();
    
      });
    });
   }
 
   // Handle data submitted from the page's HTML form
   // Determine whether we are adding a new record or amending an
   // existing record
   save()
   {
   
      let nama_aset            : string = this.form.controls["nama_aset"].value, 
         kode_aset             : string = this.form.controls["kode_aset"].value,
          register             : string = this.form.controls["register"].value, 
          kondisi                 : string = this.form.controls["kondisi"].value,
          tahun_pengadaan      : string = this.form.controls["tahun_pengadaan"].value,
          konstruksi               : string = this.form.controls["konstruksi"].value,
          status_tanah         : string = this.form.controls["status_tanah"].value,
          panjang   : string = this.form.controls["panjang"].value,
          lebar        : string = this.form.controls["lebar"].value,
          luas        : string = this.form.controls["luas"].value,
          nomor_dokumen        : string = this.form.controls["nomor_dokumen"].value,
          tanggal_dokumen       : string = this.form.controls["tanggal_dokumen"].value,
          nomor_kode_tanah        : string = this.form.controls["nomor_kode_tanah"].value,
          asal_usul            : string = this.form.controls["asal_usul"].value,
          harga                : string = this.form.controls["harga"].value,
          keterangan           : string = this.form.controls["keterangan"].value,
          kode_lokasi          : string = this.form.controls["kode_lokasi"].value,
          lokasi          : string = this.form.controls["lokasi"].value;
 
         this.createEntry(nama_aset,kode_aset, register,konstruksi,panjang,lebar,luas,tahun_pengadaan,tanggal_dokumen,nomor_dokumen,status_tanah,nomor_kode_tanah,
          asal_usul,harga,keterangan,kondisi,kode_lokasi,lokasi)
   }
 
 setKodeBarang(){
       let kode = this.nama_aset.split("_").pop(); 
       this.kode_aset=kode;
       this.kode_lokasi=localStorage.getItem('kode_lokasi')
    
 }
 
 
 }