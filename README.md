# AzureFileMobileService
Upload a large file to Azure Storage using SAS, Azure Mobile Service and Cordova (Ionic) Client. 

### Server Side Step
* [upload-data-blob-storage](https://azure.microsoft.com/en-us/documentation/articles/mobile-services-dotnet-backend-windows-universal-dotnet-upload-data-blob-storage/)
* Create Mobile Service Project
* Add WindowsAzure.Storage Nuget Package.
 * Windows Azure Storage 7.0.0</li>
 * <code>Install-Package WindowsAzure.Storage -Version 7.0.0</code>
* Add the new properties to the TodoItem class in  DataObjects folder.
* Create Azure storage Account.</li>
* In the Azure classic portal / Storage / Manage Keys / get access key.
* In your mobile service / Configure tab /App settings / add following key value pair.
  * <Code>STORAGE_ACCOUNT_NAME</Code>
  * <Code>STORAGE_ACCOUNT_ACCESS_KEY</Code>
* In Visual Studio for the mobile service project /  Web.config file add following app setting
 * ` <add key="STORAGE_ACCOUNT_NAME" value="**your_account_name**" /> `
 * ` <add key="STORAGE_ACCOUNT_ACCESS_KEY" value="**your_access_token_secret**" /> `
* Replace the existing PostTodoItem method in todoContoller

###Client Side Step
* [Ionic](http://ionicframework.com/getting-started/)
* [Azure mobileservice javascript client](https://azure.microsoft.com/en-us/documentation/articles/mobile-services-html-how-to-use-client-library/)
* [azure-blob-upload](https://github.com/kinstephen/angular-azure-blob-upload/blob/master/azure-blob-upload.js)
* Install ionic.
* Create a client project.
 * <Code>$ionic start fileClient tabs</Code>
* Run it in browser.
 * <Code>$ionic platform add android</Code>
 * <Code>$ionic build android</Code> 
 * <Code>$ionic serve</Code>
* Add the following scripts to index.html
 * ` <script src='ex/MobileServices.Web-1.2.7.min.js'></script> `
 * ` <script src="ex/azure-blob-upload.js"></script> `
* Add code to  app.js and controller.js 
