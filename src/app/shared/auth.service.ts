import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(  private fireauth : AngularFireAuth , private  router : Router ) { }
  //login method
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res=>{
      localStorage.setItem('token', 'true');
        
          if(res.user?.emailVerified == true){
            this.router.navigate(['dashboard']);
          } else{
            this.router.navigate(['/varify-email']);
          }
      

}, err =>{
      alert (err.message);
      this.router.navigate(['/login'])
 })
}

//register method
register(email: string, password : string){
  this.fireauth.createUserWithEmailAndPassword(email,password).then( (res : any)=>{
    alert('Registration successful');
    this.router.navigate(['/login']);
    this.sendEmailForVarification(res.user);
  }, err =>{
    alert(err.message);
    this.router.navigate(['/register'])

  })
}

//logout method
signout(){
  this.fireauth.signOut().then (  () =>{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}, err=>{
  alert(err.message);
}
  )}

 //forgot password method
 forgotPassword(email : string){
   this.fireauth.sendPasswordResetEmail(email).then( ()=>{
    this.router.navigate(['/varify-email'])
   }, err=>{
     alert('something went wrong.')
   })

 }

 //email verification
 sendEmailForVarification(user :any){
user.sendEmailForVarification().then( (res : any)=>{
  this.router.navigate(['varify-email'])

}, (err: any)=>{
  alert(err.message)

})
 }

 

}
