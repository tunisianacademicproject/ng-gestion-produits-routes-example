import { Component } from '@angular/core';
import {Produit} from '../model/produit';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {
produits: Array<Produit> = [
{id:1,code:'x12',designation:"Panier plastique",prix:20},
{id:2,code:'y4',designation:"table en bois",prix:100},
{id:3,code:'y10',designation:"salon en cuir",prix:3000}
];
 produitEnEdition: Produit | null = null;
  nouveauProduit: Produit = { id: 0, code: '', designation: '', prix: 0 };




  editerProduit(produit: Produit): void {
    this.produitEnEdition = { ...produit };
    console.log(this.produitEnEdition);
  }


  annulerEdition(): void {
    this.produitEnEdition = null;
  }

  supprimerProduit(produit: Produit): void {
    const index = this.produits.indexOf(produit);
    if (index !== -1) {
      this.produits.splice(index, 1);
      this.produitEnEdition = null; // Reset the edited product
    }
  }

  mettreAJourProduit(event: Event): void {
  event.preventDefault(); // Prevent the default form submission behavior
  if (this.produitEnEdition) {
    const index = this.produits.findIndex(p => p.id === this.produitEnEdition?.id);
    if (index !== -1) {
      this.produits[index] = { ...this.produitEnEdition };
      this.produitEnEdition = null;
    }
  }
}

ajouterProduit(event: Event): void {
  event.preventDefault(); // Prevent the default form submission behavior
  // Assuming that id is unique, generate a new id for the product
  this.nouveauProduit.id = this.produits.length + 1;
  this.produits.push({ ...this.nouveauProduit });
  // Reset the form
  this.nouveauProduit = { id: 0, code: '', designation: '', prix: 0 };
}
}
