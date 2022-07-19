"use strict";

(function(){

    let paymentQty = 1;
    const parsedUrl = new URL(window.location.href);
    const params = new URLSearchParams(window.location.search);
    if(params.has('quantity')) {
        paymentQty = parseInt(params.get('quantity'), 10);
    }

    document.addEventListener('DOMContentLoaded', function(){
        setActiveMenuItem();
        if(document.getElementById('payment-quantity')) {
            setHandlersPaymentPage();
        }
    });
    
    function setActiveMenuItem() {
        let innerMenuLinks = document.querySelectorAll('.top-menu a.site-inner');
        for(let i = 0; i < innerMenuLinks.length; i++) {
            innerMenuLinks[i].classList.remove('active');
            let href = innerMenuLinks[i].getAttribute('href');
            if(href == parsedUrl.pathname) {
                innerMenuLinks[i].classList.add('active');
            }
        }
    }

    function setHandlersPaymentPage() {
        document.getElementById('payment-quantity').addEventListener('input', function(event) {
            this.value = this.value.replace(/[^\d]/g, '');
            this.value = parseInt(this.value, 10);
            if(isNaN(this.value) || this.value < 1) {
                this.value = 1;
            }

            document.getElementById('payment-total-sum').innerHTML = this.value + '.00';

            let paymentLink = document.getElementById('payment-link'),
                paymentLinkHref = paymentLink.getAttribute('href');
            paymentLinkHref = paymentLinkHref.replace(/&qty=\d*&/, '&qty='+this.value+'&');
            paymentLink.setAttribute('href', paymentLinkHref);
        });
        document.getElementById('payment-minus').addEventListener('click', function(event) {
            event.preventDefault();
            let qtyInput = document.getElementById('payment-quantity'),
                qty = parseInt(qtyInput.value, 10);
            if(qty && qty > 1) {
                qtyInput.value--;
            }
            qtyInput.dispatchEvent(new Event('input'));
        });
        document.getElementById('payment-plus').addEventListener('click', function(event) {
            event.preventDefault();
            let qtyInput = document.getElementById('payment-quantity'),
                qty = parseInt(qtyInput.value, 10);
            if(qty) {
                qtyInput.value++;
            }
            qtyInput.dispatchEvent(new Event('input'));
        });
        if(paymentQty) {
            document.getElementById('payment-quantity').value = paymentQty;
            document.getElementById('payment-quantity').dispatchEvent(new Event('input'));
        }
    }

})();
