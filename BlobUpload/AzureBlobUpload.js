require("dotenv").config();
const { v1: uuidv1 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");



exports.azureBlobfunction=async(req)=>{
    console.log(req.files);
    let blobName = req.body.blobName.toLowerCase();
    let blobExtension = req.body.blobExtension.toLowerCase();
    let containerName = req.body.containerName.toLowerCase();
    let file = req.files.file;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
  
    try {
      async function setBlob() {
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error("Azure Storage accountName not found");
  
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          new DefaultAzureCredential()
        );
  
        const containerClient =
          blobServiceClient.getContainerClient(containerName);
  
        // Create a unique name for the blob
        blobName += uuidv1() + `${blobExtension}`;
  
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
        // Display blob name and url
        console.log(
          `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
        );
  
        // Upload data to the blob
        const data = file.data;
        const uploadBlobResponse = await blockBlobClient.upload(
          data,
          data.length
        );
        console.log(
          `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );
  
        // res
        //   .status(200)
        //   .json({
        //     Message: `Blob created ${blobName} for container ${containerName}`,
        //   });
      }
      setBlob();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
}

exports.getBlobStroageFile=async(req)=>{
    let containerName = req.body.containerName.toLowerCase();
    let blobName = req.body.blobName.toLowerCase();
  
    try {
      async function getBlob() {
        let count = 0;
        let url;
  
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error("Azure Storage accountName not found");
  
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          new DefaultAzureCredential()
        );
  
        const containerClient =
          blobServiceClient.getContainerClient(containerName);
  
        console.log("\nListing blobs...");
  
        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
          // Get Blob Client from name, to get the URL
          if (blob.name === blobName) {
            count++;
            const tempBlockBlobClient = containerClient.getBlockBlobClient(
              blob.name
            );
            url = tempBlockBlobClient.url;
            // Display blob name and URL
            console.log(
              `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
            );
          }
        }
  
        if (count === 1) {
          res.status(200).json({
            Message: `Blob found ${blobName}`,
            Url: `${url}`,
          });
        }
        else if(count === 0){
          console.log(`No Blobs were found of the name ${blobName}`);
        //   res.status(500).json({Message: `No Blobs were found of the name ${blobName}`});
        }
      }
      getBlob();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
}