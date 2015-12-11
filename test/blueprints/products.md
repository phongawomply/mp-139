# Products API
## Products resource [/api/0.1/products/{id}]
   + Parameters
    + id: 1 (number) - The Merchant Location ID


### GET
  Get the products available to a given MID
 + Response 200

     {
       "data":
         {
         "jointProducts": [
           {
               "id": 1,
               "name": "Insights Essentials",
               "description": "360° business monitoring",
               "status": "enabled",
               "branding": "joint",
               "urlSubDomain": "",
               "urlPartnerDomain": true,
               "urlLandingPage": "/highlights"
           }
         ],
         "womplyProducts": [
           {
               "id": 5,
               "name": "Customer Pulse",
               "description": "Know your customers",
               "status": "unsupported partner",
               "branding": "womply",
               "urlSubDomain": "app2",
               "urlPartnerDomain": true,
               "urlLandingPage": "/summary"
           },
           {
               "id": 6,
               "name": "Reputation Defense",
               "description": "Protect your online reputation",
               "status": "enabled",
               "branding": "womply",
               "urlSubDomain": "app1",
               "urlPartnerDomain": true,
               "urlLandingPage": "/recent_reviews/needs_action"
           },
           {
               "id": 7,
               "name": "Launchpad",
               "description": "Get found by customers",
               "status": "enabled",
               "branding": "womply",
               "urlSubDomain": "",
               "urlPartnerDomain": true,
               "urlLandingPage": "/launchpad"
           },
           {
               "id": 8,
               "name": "Social Blast",
               "description": "Post to social media",
               "status": "enabled",
               "branding": "womply",
               "urlSubDomain": "app3",
               "urlPartnerDomain": false,
               "urlLandingPage": "/connect"
           },
           {
               "id": 9,
               "name": "Vault",
               "description": "Securely store your most important business documents",
               "status": "enabled",
               "branding": "womply",
               "urlSubDomain": "app4",
               "urlPartnerDomain": true,
               "urlLandingPage": ""
           }
         ],
         "partner":
           {
               "id": 63,
               "name": "Axia",
               "zendeskAlias": "axiainsights",
               "domain": "axiainsights.com"
           }
         }
     }
