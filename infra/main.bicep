// ---------------------------------------------------------------
// Hello World infrastructure
// Creates: an App Service Plan (Free F1, Windows) + a Web App
// ---------------------------------------------------------------

@description('Azure region. Defaults to the resource group location.')
param location string = resourceGroup().location

@description('Globally unique name for the web app.')
param webAppName string

@description('Name of the App Service Plan.')
param appServicePlanName string = 'asp-hello-bicep'

// ----- The MACHINE that runs your site -----
resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'F1'        // Free tier
    tier: 'Free'
  }
  properties: {
    reserved: false   // false = Windows, true = Linux
  }
}

// ----- The WEBSITE itself -----
resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id   // links the site to the plan above
    httpsOnly: true
    siteConfig: {
      netFrameworkVersion: 'v8.0'
      defaultDocuments: [
        'index.html'
      ]
      ftpsState: 'Disabled'
      minTlsVersion: '1.2'
    }
  }
}

// ----- Values printed after deployment -----
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output webAppResourceId string = webApp.id
