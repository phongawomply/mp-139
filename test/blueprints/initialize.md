# Group Womply Initialize API

## Womply Initialize Resource [/api/0.1/initialize{?id}]
An example of defining a resource in blueprints.
+ Parameters
  + id: 1 (number) - An unique identifier of the resource.

### GET
Get the initialize resource from the monolith.
+ Response 200 (application/json)

  {
    "data": {
      "mixpanel_token": "a5a297cbb4f0ba1d02ae09c33e5e5053",
      "merchant_locations": [
      {
        "id": 193,
        "name": "The Ugly Mug TEST",
        "address1": "723 8th St SE",
        "address2": "",
        "city": "Washington",
        "state": "DC",
        "zip": "20003",
        "lat": "38.8804590789",
        "lng": "-76.9953418695",
        "phone": "2025478459",
        "slug": "the-ugly-mug",
        "setup_step": "complete",
        "recommendation": null,
        "short_url_path": "theuglymugdc",
        "category_id": 37,
        "category_name": "Pubs",
        "product_type": "InsightsPlusProduct",
        "is_demo": 0,
        "is_first_visit": 0,
        "partner_name": "Womply",
        "partner_slug": "womply",
        "partner_google_analytics_id": "UA-56538938-1",
        "has_quickbooks_authorization": 0,
        "product_name": "Insights",
        "menu_url": null,
        "price": null,
        "website_url": "http://uglymugdc.com",
        "business_email": null,
        "product_features": {
          "monthly_business_summaries": true,
          "reputation_alerts": true,
          "weekly_business_summaries": true,
          "weekly_competitor_summaries": true
          },
          "can_access_customer_highlights": false
          },
          {
            "id": 250,
            "name": "Irish Channel",
            "address1": "500 H St NW",
            "address2": "",
            "city": "Washington",
            "state": "DC",
            "zip": "20001",
            "lat": "38.9071923016",
            "lng": "-77.0368706485",
            "phone": "2022160086",
            "slug": "irish-channel",
            "setup_step": "complete",
            "recommendation": null,
            "short_url_path": "irishchannelpubdc",
            "category_id": 37,
            "category_name": "Pubs",
            "product_type": "InsightsPlusProduct",
            "is_demo": 0,
            "is_first_visit": 0,
            "partner_name": "Womply",
            "partner_slug": "womply",
            "partner_google_analytics_id": "UA-56538938-1",
            "has_quickbooks_authorization": 0,
            "product_name": "Insights",
            "menu_url": null,
            "price": null,
            "website_url": "http://www.irishchannelpub.com",
            "business_email": null,
            "product_features": {
              "monthly_business_summaries": true,
              "reputation_alerts": true,
              "weekly_business_summaries": true,
              "weekly_competitor_summaries": true
              },
              "can_access_customer_highlights": false
              },
              {
                "id": 197330,
                "name": "DANTE PIZZERIA NAPOLETANA",
                "address1": "16901 WRIGHT PLZ",
                "address2": "SUITE 1733",
                "city": "OMAHAa",
                "state": "HI",
                "zip": "681301",
                "lat": "41.2325508218",
                "lng": "-96.1782678388",
                "phone": "4029323078",
                "slug": "dante-pizzeria-napoletana",
                "setup_step": "complete",
                "recommendation": null,
                "short_url_path": "tdnrx",
                "category_id": 284,
                "category_name": "Pizza Restaurants",
                "product_type": "InsightsPlusProduct",
                "is_demo": 0,
                "is_first_visit": 0,
                "partner_name": "TSYS",
                "partner_slug": "tsys",
                "partner_google_analytics_id": "UA-56538938-1",
                "has_quickbooks_authorization": 0,
                "product_name": "Merchant Insights",
                "menu_url": null,
                "price": null,
                "website_url": "http://dantepizzerias.com",
                "business_email": null,
                "product_features": {
                  "monthly_business_summaries": true,
                  "reputation_alerts": true,
                  "weekly_business_summaries": true,
                  "weekly_competitor_summaries": true
                  },
                  "can_access_customer_highlights": false
                  },
                  {
                    "id": 355259,
                    "name": "EUPHORIA HAIR & BODY SALON (VALERIA) (PMOBILE)",
                    "address1": "3105 ROCKHILL CHURCH RD",
                    "address2": null,
                    "city": "CONCORD",
                    "state": "NC",
                    "zip": "28027",
                    "lat": "35.4087517327",
                    "lng": "-80.5795109568",
                    "phone": "7047845955",
                    "slug": "euphoria-hair-body-salon-valeria-pmobile",
                    "setup_step": "complete",
                    "recommendation": 10,
                    "short_url_path": "cywrh",
                    "category_id": 77,
                    "category_name": "Hair Salons and Barbershops",
                    "product_type": "InsightsProduct",
                    "is_demo": 0,
                    "is_first_visit": 0,
                    "partner_name": "Womply",
                    "partner_slug": "womply",
                    "partner_google_analytics_id": "UA-56538938-1",
                    "has_quickbooks_authorization": 0,
                    "product_name": "Insights",
                    "menu_url": null,
                    "price": null,
                    "website_url": "http://www.euphoriabodysalon.com/",
                    "business_email": null,
                    "product_features": {
                      "monthly_business_summaries": true,
                      "reputation_alerts": false,
                      "weekly_business_summaries": false,
                      "weekly_competitor_summaries": false
                      },
                      "can_access_customer_highlights": false
                    }
                    ],
                    "user": {
                      "id": 652676,
                      "name": "YourFirstName LastName",
                      "is_womply_staff": true,
                      "is_admin": true,
                      "is_demo": false,
                      "show_individual_transactions": false,
                      "mobile_phone_number_verified": false,
                      "completed_merchant_setup": false
                      },
                      "chat": {
                        "user_id": 652676,
                        "name": "YourFirstName LastName",
                        "email": "blah@womply.com",
                        "created_at": 1438886284,
                        "app_id": "yps9gs9t",
                        "user_hash": "35601287395570c3edcc26b84cccc2158ddbf32d5e0e86ea0e439d755a0c1664"
                      }
                    }
                  }