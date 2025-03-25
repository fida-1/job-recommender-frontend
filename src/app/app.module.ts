import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Utilisation du RouterModule pour gérer les routes
import { FormsModule } from '@angular/forms'; // Importez FormsModule


@NgModule({
  imports: [
    BrowserModule,           // Nécessaire pour une application Angular dans un navigateur
    RouterModule, 
    FormsModule            // Permet la navigation entre les différentes routes
  ]
})
export class AppModule { }
