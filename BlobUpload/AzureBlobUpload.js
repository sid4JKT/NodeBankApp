require("dotenv").config();
const { v1: uuidv1 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");



exports.azureBlobfunction=async(req)=>{
  try {
    let blobName = req.body.blobName.toLowerCase();
    let blobExtension = req.body.blobExtension.toLowerCase();
    let file = req.files.file;
    console.log(file.data,"24")// 
    // async function upload (params) {
  // Create a unique name for the blob


// Get a block blob client
const accountName ="storagejktraining";
  if (!accountName) throw Error('Azure Storage accountName not found');
  console.log(' container...');
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  // const containerName = 'quickstart85534a40-a60c-11ed-906f-c7e4eaa0d700';
  const containerName = req.containerName;

  console.log('\connecting container...');
  console.log('\t', containerName);
 blobName = blobName + uuidv1() + ''+blobExtension;
  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = containerClient.getBlockBlobClient(blobName);

// Display blob name and url
console.log(
  `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
);

// Upload data to the blob

const data = file.data;
const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
console.log(
  `Blob was uploaded successfully. requestId:,${uploadBlobResponse.clientRequestId}`
);

res.send({message:"successfully upload ",refrenceId:`${blobName}`
})
   } catch (error) {
    console.log("not able to upload: ",error)
    throw err
  
   }
}

exports.getBlobStroageFile=async(req)=>{
   try {
    const accountName ="storagejktraining";
if (!accountName) throw Error('Azure Storage accountName not found');
console.log(' container...');
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

// const containerName = 'quickstart85534a40-a60c-11ed-906f-c7e4eaa0d700';
const containerName = req.containerName;
const  blobName=req.blobName
console.log('\connecting container...');
console.log('\t', containerName);
// blobName = blobName + uuidv1() + ''+blobExtension;
// Get a reference to a container
const containerClient = blobServiceClient.getContainerClient(containerName)



// List the blob(s) in the container.
for await (const blob of containerClient.listBlobsFlat()) {
  // Get Blob Client from name, to get the URL
  const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

  // Display blob name and URL
  // if(blob.name=="demo_blob085e51c0-a610-11ed-8d33-b97105c922f.txt")
  if(blob.name==blobName)
 {
  console.log(
    `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
  );
  return tempBlockBlobClient.url

 }
 else{
  
    console.log("not found")
  
 }
}
   } catch (err) {
    console.log("no blob found")
    throw err
    
   }
}