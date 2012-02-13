(function ($) {
  Drupal.behaviors.stripeFormFix = {
    attach: function (context)  {
      $('#edit-commerce-payment-payment-details-credit-card-number');
      $('#edit-commerce-payment-payment-details-credit-card-code');
      
      $("#commerce-checkout-form-review").submit(function(event) {
          Stripe.createToken({
              number: $('#edit-commerce-payment-payment-details-credit-card-number').val(),
              cvc: $('#edit-commerce-payment-payment-details-credit-card-code').val(),
              exp_month: $('#edit-commerce-payment-payment-details-credit-card-exp-month').val(),
              exp_year: $('#edit-commerce-payment-payment-details-credit-card-exp-year').val()
          }, stripeResponseHandler);
          // prevent the form from submitting with the default action
          return false;
      });
    }
  }
})(jQuery);

stripeResponseHandler = function(status, response) {
  console.log(response);
  if (response.error) {
    //show the errors on the form
    jQuery("#commerce-stripe-payment-errors").html(response.error.message);
  }
  else {
    // token contains id, last4, and card type
    var token = response['id'];
    // insert the token into the form so it gets submitted to the server
    jQuery('#commerce-stripe-token').val(token);
    jQuery('#edit-commerce-payment-payment-details-credit-card-number').val('XXXXXXXXXXXXXXX');
    jQuery('#edit-commerce-payment-payment-details-credit-card-code').val('xxx');
    jQuery("#commerce-checkout-form-review").get(0).submit();
  }
}
