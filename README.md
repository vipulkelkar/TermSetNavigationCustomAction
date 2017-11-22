# Term Set Navigation Custom Action

The term set nav custom action uses the code base of the awesome Tenant Global Nav Bar SPFx extension sample : https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-tenant-global-navbar 

Since the SPFx extensions can only be used on the modern pages, this custom action with the same functionality can be used on the classic pages.

## What's different in this code ?
_______________________________

1. Removed SPFx specific code

All the SPFx related code from the extensions sample is removed. For instance, the API calls in the spfx sample use the SPHttpClient and the context object. This has been replaced to use the "Axios" library to make HTTP calls : https://www.npmjs.com/package/axios

2. Custom gulpfile

There is a custom gulpfile that builds and bundles the code into a single JS file that can be used as custom action


## Deployment
_______________________________

The term set that must be used to fetch the navigation links is a constant variable in the **TenantGlobalNavBarApplicationCustomizer.ts** file

-- Documentation update in progress --
