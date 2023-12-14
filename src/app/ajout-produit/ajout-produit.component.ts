import { Component } from '@angular/core';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrl: './ajout-produit.component.css'
})
export class AjoutProduitComponent {
  nouveauProduit: Produit = { id: 0, code: '', designation: '', prix: 0 };

  ajouterProduit(): void {
    // Logique pour ajouter le produit, éventuellement en émettant un événement
    console.log('Nouveau produit ajouté :', this.nouveauProduit);
    // Réinitialiser le formulaire
    this.nouveauProduit = { id: 0, code: '', designation: '', prix: 0 };
  }
}
