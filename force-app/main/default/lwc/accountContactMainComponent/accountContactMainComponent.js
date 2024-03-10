import { LightningElement,wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountHandler.getAllAccounts'
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import {MessageContext, publish} from 'lightning/messageService'


export default class AccountContactMainComponent extends LightningElement {
    accountList
    selectedAccount
    showModal = false
    buttonDisabled = true
   
    @wire(MessageContext)
    context




   @wire(getAllAccounts)
   accountWirehandler({data,error}){
    if(data){
        this.accountList = [{value:null,label:'Select Account'}]
        data.forEach(item=>{              
            let eachaccount ={}
            eachaccount.label=item.Name
            eachaccount.value=item.Id
            this.accountList.push(eachaccount)
      })
    }
    if (error){
        console.error('error')            
     }


   }


   handleChange(event) {
    this.selectedAccount = event.detail.value
    if(this.selectedAccount !=null){
        this.buttonDisabled  =false
    }else{
        this.buttonDisabled  =true
    }
   }


   createContact(){
      this.showModal =true
   }
   closeHandler(){
    this.showModal = false
  }


  showAccountsContacts(){
    const message={
      lmsData:{
          value:this.selectedAccount
      }
     }
     publish(this.context, SAMPLEMC, message)


  }
}
