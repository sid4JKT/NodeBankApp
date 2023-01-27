// // // let req={
// // // }

// // // req.cust_id=1
// // // req.firstname="adarsh"
// // // req.status=true

// // // let v=1

// // // let getCustInfoQuerry=`select  
// // // public.customerdetail.cust_id ,
// // // public.customerdetail.firstname,
// // // public.accounttype.accounttype,
// // // public.accounttype.accsubtype,
// // // public.customeraccounts.acctnum,
// // // public.accounttype.status,
// // // public.savingaccountdetail.balance,
// // // public.loanaccountdetail.balanceamount
// // // from public.customerdetail Join public.customeraccounts on customerdetail.cust_id=customeraccounts.cust_id
// // // join public.accounttype on accounttype."accountNumber"=customeraccounts.acctnum
// // // join public.savingaccountdetail on savingaccountdetail.acctnum=accounttype."accountNumber"
// // // join public.loanaccountdetail on loanaccountdetail.acctnum=accounttype."accountNumber" where `

// // // let finaldata=""

// // // for (const key in req) {
// // //     let appenddata=""
     
// // //      let customerdetail='customerdetail'
// // //      let  accounttype='accounttype'
// // //      console.log("the key=",key)
// // //      if(key=='cust_id' )
// // //      {
// // //         appenddata=customerdetail+"."+appenddata+key
// // //         appenddata=appenddata+"="+req[key]
// // //      }
// // //      else if( key =='firstname')
// // //      {
// // //        appenddata=customerdetail+"."+appenddata+`${key}`
// // //        appenddata=appenddata+"="+`"${req[key]}"`
// // //      }
// // //      else{
// // //         appenddata=accounttype+"."+appenddata+key
// // //         appenddata=appenddata+"="+req[key]
// // //      }
    
// // //     if(Object.keys(req).length!=v)
// // //    {
// // //      finaldata=finaldata+appenddata+" AND "
// // //      console.log(appenddata,Object.keys(req).length,v)
// // //     }
// // //     else{
// // //         finaldata=finaldata+appenddata+"  "
// // //     }
// // //    v++    
// // // }




// // // console.log(getCustInfoQuerry+finaldata)


// // function randomNumberInt(length) {
// //     const result = [];
// //     while (result.length !== length) {
// //       let random = getRandomArbitrary(0, 9);
// //       if (!result.includes(random)) result.push(random);
  
// //       // To check if the first no is not zero
// //       if (result.length === 1 && random === 0) result.pop();
// //     }
// //     return parseInt(result.join(""));
// //   }
  
// //   function getRandomArbitrary(min, max) {
// //     return Math.floor(Math.random() * (max - min) + min) + 1;
// //   }

// // console.log(randomNumberInt(4))

// let objectdata={
//     Doc_Date: '',
// Doc_Id: '1',
// doc_name: ''
// }

// let req={}
// for (const key in objectdata) {
// if(objectdata[key]!="")
// {
// console.log(objectdata[key])
//     req[key]=objectdata[key]
// }
// }


// let getCustInfoQuerry=`select * from public."document_cutomer_master _table" where `;

// let v=0
// let finaldata="";
// for (const key in req) {
//   let appenddata=""
   
//    let customerdetail='document_cutomer_master _table'
   
//    console.log("the key=",key)
//    if(key=='Doc_Date' || key=='doc_name')
//    {
//       if(req[key]!='')
//       {appenddata=customerdetail+"."+appenddata+key
//       appenddata=appenddata+"="+''+`'${req[key]}'`+''
//       v++
//   }
//    }
  
//    else if(key=='Doc_Id' ){
//       if(req[key]!='')
//       {

//       appenddata=customerdetail+"."+appenddata+key
//       appenddata=appenddata+"="+''+`${req[key]}`+''
//       v++
//       }
//    }
  
//   if(Object.keys(req).length!=v)
//  {
//    finaldata=finaldata+appenddata+" AND "
// //    console.log(appenddata,Object.keys(req).length,v)
//   }
//   else{
//       finaldata=finaldata+appenddata+"  "
//   }

 
  
// }
// console.log("final extract querry is ",getCustInfoQuerry+finaldata
function func1() {
  
try{  console.log("fun1")
  throw new NotEnoughCoffee('Well, you may need another coffee :)')  
} catch(err)
{
console.log("a")
throw new Error(err)
}
   
  }

function func2() {
  console.log('func2...');
  try {
  console.log(func1());
  } catch (err) {
    console.log('Caught error',err);
    throw err

  }
}

function fun3() {
  try{
    console.log("fun3")
func2()
  }catch(err)
  {
    console.log("fun3",err)
  }
}

fun3();

// console.log('func1()');
// func1();

const now = new Date()
console.log(now)