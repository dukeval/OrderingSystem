import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { LoginVerificationServiceService } from '../login-verification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  inventoryItems: {
    itemID: string;
    itemName: string;
    itemDescription: string;
    itemImage: string;
    itemPrice: number;
  }[] = [];

  purchasedItems: {
    itemID: string;
    itemName: string;
    itemDescription: string;
    itemImage: string;
    itemPrice: number;
    purchasedDate: Date;
  }[] = [];

  constructor(
    private loginService: LoginVerificationServiceService,
    private purchaseService: PurchaseService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.purchaseService.buildInventory().subscribe(result => {
        console.log(result);

        this.purchaseService.getInventory().subscribe(result => {
          this.inventoryItems = result;
        });
      });
    } else {
      this.route.navigate(['login']);
    }
  }

  addToUserOrderHistory(itemPurchased: any): void {
    this.purchasedItems.push({
      itemID: itemPurchased.itemID,
      itemName: itemPurchased.itemName,
      itemDescription: itemPurchased.itemDescription,
      itemImage: itemPurchased.itemImage,
      itemPrice: itemPurchased.itemPrice,
      purchasedDate: new Date()
    });

    this.purchaseService
      .itemPurchased(this.purchasedItems)
      .subscribe(result => {
        if (result) {
          alert(
            'Thank you for your purchase!  You can view purchased items in your profile.'
          );
        }
      });
    this.purchasedItems = [];
  }
}
