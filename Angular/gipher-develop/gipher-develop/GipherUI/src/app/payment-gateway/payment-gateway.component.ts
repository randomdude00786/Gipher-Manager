import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {
  vp:boolean=false;
  paymentHandler:any = null;

  constructor(private router:Router,private notifyService:NotificationService) { }

  ngOnInit() {
    this.invokeStripe();
    
  }
  initializePayment(amount: number) {
    
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N8gtrSEYyGbagDQbpVJiEtGasb8YnHxbcgAaeAwblEQ074IMA6K8sUznbnGchsoxrhh9OKm724Sfw4AhMPEpJxr00ngzsGRM1',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken});
         
      }
      
    });
    paymentHandler.open({
      name: 'NSE',
      description: 'Bookmarking a Gif',
      amount: amount * 100
    });
    this.vp=true;
    
  }
  verifyPayment(){
    if(this.vp===true){ this.router.navigate(['/dashboard']);
    this.notifyService.showSuccess("Payment Successfull", "Gipher App");
    this.notifyService.showSuccess("Bookmark Successfull", "Gipher App")}
  }
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51N8gtrSEYyGbagDQbpVJiEtGasb8YnHxbcgAaeAwblEQ074IMA6K8sUznbnGchsoxrhh9OKm724Sfw4AhMPEpJxr00ngzsGRM1',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          }
        });
      }
      window.document.body.appendChild(script);
     
    }
    
  }
  
}
