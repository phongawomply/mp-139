# Billing API
## Get cards [/v1/signup/access/{merchantLocationID}]
  + Parameters
    + merchantLocationID: 1 (number) - The mlid
### GET
  Return whether or not the user has access to this merchant's billing page
  + Response 200

## Get cards [/v1/signup/cards/{merchantLocationID}]
  + Parameters
    + merchantLocationID: 1 (number) - The mlid
### GET
  Get the stored cards for the merchant location
  + Response 200
  [
    {
      "merchantLocationId": 193,
      "expirationMonth": "05",
      "expirationYear": "2026",
      "cardToken": "36939485",
      "lastFour": "0002",
      "type": "amex",
      "firstName": null,
      "lastName": null,
      "address": null,
      "city": null,
      "state": null,
      "postalCode": "90210",
      "country": null,
      "status": null,
      "id": "2e24fb1f-0f09-44d5-8140-bc64b2a84b16"
    }
  ]

## Add card [/v1/swiper/addCard/{merchantLocationID}]
+ Parameters
    + merchantLocationID: 1 (number) - The mlid
### POST
  Create a new card with the provided card details
  expected body {
    "rawCreditCardNumber": "370000000000002",
    "expirationMonth": "11",
    "expirationYear": "2020",
    "cardType": "American Express",
    "cvv": "1234",
    "postalCode": "90210",
    "email": "hecka@hella.com",
    "createReason": "Customer Feedback signup"
  }
  + Response 204

## Remove card [/v1/signup/cards/{merchantLocationID}/{cardID}]
+ Parameters
    + merchantLocationID: 1 (number) - The mlid
    + cardID: "2e24fb1f-0f09-44d5-8140-bc64b2a84b16" (string) - The card ID
### DELETE
  Remove the specified card from the specified merchant
  + Response 204

## Subscription Resource [/v1/signup/subscriptions/{merchantLocationID}/10]
  The subscription resource represents a billable contract in the billing system.
+ Parameters
    + merchantLocationID: 1 (number) - The mlid
### GET
  Get a list of subscription instances from the billing services.  These may be in a variety of states.
  + Response 200
  [
    {
         "id": "cf38f7af-7e7f-4b3d-b5e4-911e62f316c1",
         "productId": 10,
         "billingPeriod": "MONTHLY",
         "status": "ACTIVE",
         "inTrial": true,
         "startDate": 1464652800,
         "billingStartDate": 1464652800,
         "chargedThroughDate": 1464652800
     }
  ]

### POST
  Create a subscription for billing purposes.
  + Response 200
