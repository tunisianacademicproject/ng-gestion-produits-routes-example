import { Component } from '@angular/core';
import {Produit} from '../model/produit';
import { NgForm } from '@angular/forms';
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
produitCourant = new Produit();
supprimerProduit(p: Produit){
  //Afficher une boite de dialogue pour confirmer la suppression
  let reponse:boolean =confirm("Voulez vous supprimer le produit :"+p.designation+" ?");
  if (reponse==true)
  {
    console.log("Suppression confirmée..." );
    //chercher l'indice du produit à supprimer
    let index: number = this.produits.indexOf(p);
    console.log("indice du produit à supprimer: "+index);
    if (index !== -1)
    {
    // supprimer le produit référencé
    this.produits.splice(index, 1);
    }
  }
  else
  {
  console.log("Suppression annulée..." );
  }
}

validerFormulaire(form: NgForm) {
    if (form.value.id !== undefined) {
      const existingProduct = this.produits.find(p => p.id === form.value.id);
      if (existingProduct) {
        const confirmation = confirm("Un produit avec cet ID existe déjà. Voulez-vous le mettre à jour?");
        if (confirmation) {
          existingProduct.code = form.value.code;
          existingProduct.designation = form.value.designation;
          existingProduct.prix = form.value.prix;
          console.log("Produit mis à jour :", existingProduct);
        } else {
          console.log("Mise à jour annulée...");
        }
      } else {
        console.log("Nouveau produit ajouté :", form.value);
        this.produits.push(form.value);
      }
    } else {
      console.log("ID vide...");
    }
  }

  annulerSaisie() {
    this.produitCourant = new Produit();
  }

  editerProduit(p: Produit) {
    this.produitCourant = p;
  }

}

