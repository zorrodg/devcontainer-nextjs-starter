import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import { getFilesToUpload, FileAsset } from "./utils/files";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("testResourceGroup");

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("test", {
  resourceGroupName: resourceGroup.name,
  sku: {
    name: storage.SkuName.Standard_LRS,
  },
  kind: storage.Kind.StorageV2,
});

const staticWebsite = new storage.StorageAccountStaticWebsite(
  "testStaticWebsite",
  {
    accountName: storageAccount.name,
    resourceGroupName: resourceGroup.name,
    indexDocument: "index.html",
  }
);

const filesToUpload: pulumi.Output<FileAsset[]> = pulumi.output(
  getFilesToUpload("../src/client/out")
);

filesToUpload.apply((files) =>
  files.map(
    ({ path, name, type }) =>
      new storage.Blob(name, {
        resourceGroupName: resourceGroup.name,
        accountName: storageAccount.name,
        containerName: staticWebsite.containerName,
        source: new pulumi.asset.FileAsset(path),
        contentType: type,
      })
  )
);

// Export the primary key of the Storage Account
const storageAccountKeys = pulumi
  .all([resourceGroup.name, storageAccount.name])
  .apply(([resourceGroupName, accountName]) =>
    storage.listStorageAccountKeys({ resourceGroupName, accountName })
  );

export const primaryStorageKey = storageAccountKeys.keys[0].value;
export const staticEndpoint = storageAccount.primaryEndpoints.web;
