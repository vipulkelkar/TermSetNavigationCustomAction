# Term Set Navigation Custom Action

The term set nav custom action uses the code base of the awesome Tenant Global Nav Bar SPFx extension sample : https://github.com/SharePoint/sp-dev-fx-extensions/tree/master/samples/react-application-tenant-global-navbar 

Since the SPFx extensions can only be used on the modern pages, this custom action with the same functionality can be used on the classic pages.

## What's different in this code ?
_______________________________

1. Removed SPFx specific code

  All the SPFx related code from the extensions sample is removed. For instance, the API calls in the spfx sample use the SPHttpClient    and the context object. This has been replaced by the "Axios" library to make HTTP calls : https://www.npmjs.com/package/axios

2. Custom gulpfile and webpack

  There is a custom gulpfile to build and bundle the code into a single JS file. Custom webpack configuration is used in the gulpfile to bundle and minify the code files. The typescript and scss files are compiled using the @microsft/gulp-core-build package.


## Deployment
_______________________________

- Clone this repository
- Install the packages using the command

  `npm i`
  
- The term set that must be used to fetch the navigation links is a constant variable in the **TenantGlobalNavBarApplicationCustomizer.ts** file. Change this as required.

- Execute the following command to make sure that the code builds successfully.

  `gulp build`
  
- Then run the below command to bundle the code into a single JS. The bundle is created in the **\<Code Path>\dist** folder.

  `gulp bundle`
  
- Once the files are bundled, you can inject the bundled JavaScript to a SharePoint site through CSOM or PnP powershell. Eg script to inject Javascript : http://ukreddysharepoint2010.blogspot.in/2016/12/how-to-inject-javascript-in-sharepoint.html
  

## Change the order of Navigation nodes
_______________________________

To change the order ot navigation nodes, head over to the term store administration, select the term set that is being used for Navigation and from the "Custom Sort" tab, change the order of the links.
 
 ## Change the name of bundled JS file
_______________________________

The bundle configuration is in the **gulpfile.js**. Change the Output filename in the webpack config in gulpfile.js
