import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Array<Produit> = [];
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    console.log("Initialisation du composant: Récupérer la liste des produits");
    this.consulterProduits();
  }

  produitCourant = new Produit();

  consulterProduits() {
    this.http.get<Array<Produit>>("http://localhost:9999/produits")
      .subscribe({
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      });
  }

  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de :" + ancien.designation + "?");

    if (confirmation) {
      this.http.put<Array<Produit>>("http://localhost:9999/produits/" + ancien.id, nouveau)
        .subscribe({
          next: updatedProduit => {
            console.log("Succès PUT");
            ancien.code = nouveau.code;
            ancien.designation = nouveau.designation;
            ancien.prix = nouveau.prix;
            console.log('Mise à jour du produit:' + ancien.designation);
          },
          error: err => {
            console.log("Erreur PUT");
          }
        });
    } else {
      console.log("Mise à jour annulée");
    }
  }

  ajouterProduit(nouveau: Produit) {
    console.log('Nouveau produit');
    this.http.post<Produit>("http://localhost:9999/produits", nouveau)
      .subscribe({
        next: newProduct => {
          console.log("Succès POST");
          this.produits.push(newProduct);
        },
        error: err => {
          console.log("Erreur POST");
        }
      });
  }

  supprimerProduit(produit: Produit) {
    const reponse: boolean = confirm("Voulez-vous supprimer le produit :" + produit.designation + "?");

    if (reponse) {
      console.log("Suppression confirmée...");

      this.http.delete("http://localhost:9999/produits/" + produit.id)
        .subscribe({
          next: () => {
            console.log("Succès DELETE");
            const index: number = this.produits.indexOf(produit);

            console.log("Indice du produit à supprimer: " + index);

            if (index !== -1) {
              this.produits.splice(index, 1);
            }
          },
          error: err => {
            console.log("Erreur DELETE");
          }
        });
    } else {
      console.log("Suppression annulée...");
    }
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);

    if (form.value.id !== undefined) {
      console.log("id non vide...");
      let nouveau: boolean = true;
      let index = 0;

      do {
        let p = this.produits[index];
        console.log(p.code + ' : ' + p.designation + ': ' + p.prix);

        if (p.id == form.value.id) {
          nouveau = false;
          console.log('ancien');
          this.mettreAJourProduit(form.value, p);
          return;
        } else {
          index++;
        }
      } while (nouveau && index < this.produits.length);

      if (nouveau) {
        console.log('nouveau');
        this.ajouterProduit(form.value);
        console.log("Ajout d'un nouveau produit:" + form.value.designation);
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
