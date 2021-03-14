import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { LoginVerificationServiceService } from '../login-verification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  orderHistory: {
    itemName: string;
    itemDescription: string;
    itemImage: string;
    itemPrice: number;
    purchasedDate: Date;
  }[] = [];

  noOrderFound: boolean = false;

  constructor(
    private loginService: LoginVerificationServiceService,
    private purchaseService: PurchaseService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.purchaseService.getPurchases().subscribe(
        result => {
          this.orderHistory = result.orders;
        },
        err => {
          if (err.error.err == 'No Orders found for user.')
            this.noOrderFound = true;
        }
      );
    } else this.route.navigate(['login']);
  }
}
