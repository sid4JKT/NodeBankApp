async function getRandomFileName(){
    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
}
var fs = require('fs')
var path = require('path')
try {
    fs.watch('pdfdocuments/', async function(event, filename) {
        if (filename) {
            data = filename
            console.log(filename);
            var getfilename = await getRandomFileName()
           // var src ='D:\\New folder\\nodesession\\Tempfolder\\uploads\\';
            var srcPath = 'pdfdocuments\\'+filename
            var desPath = path.join(__dirname+'/archive/'+getfilename+'.pdf')
            // var des = getfilname+'.pdf'
            console.log(srcPath,desPath)
            // fs.copyFile(srcPath,desPath,(err)=>{  //to copy file
            //     if(err){
            //         console.log(err,"while copying file")
            //     }
            // })
                fs.rename(srcPath, desPath,(err)=>{   //to move file
                    if(err){
                        console.log(err,"while moving file");
                    }
                    else
                    console.log(`Moved ${srcPath} to ${desPath}`);
                });
         }
    })
} catch (error) {
    console.log(error)
}