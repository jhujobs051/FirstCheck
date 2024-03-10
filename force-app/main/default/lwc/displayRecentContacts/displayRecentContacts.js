import { LightningElement ,wire,track} from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import {subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe} from 'lightning/messageService';
import getAllAccountsContacts from '@salesforce/apex/AccountHandler.getAllAccountsContacts'

export default class DisplayRecentContacts extends LightningElement {
    @track columns = [
        {
            label: 'Account Name', fieldName: 'accName', type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' },
                target: '_blank'
            }
         
    },
        {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'test',
        sortable: true
    }
]
@track columns1 = [
   
     { label: 'Contact Name', fieldName: 'CName', type: 'url',
     typeAttributes: {
         label: { fieldName: 'Name' },
         target: '_blank'
       
     } },
     { label: 'Email', fieldName: 'Email', type: 'email' },
     { label: 'Phone', fieldName: 'Phone', type: 'phone'}
   ]
   
    recievedAccount
    subscription
    accConList
    acclist
    conlist
    @wire(MessageContext)
    context
    connectedCallback(){
        this.subscribeMessage()
    }


    subscribeMessage(){
        //subscribe(messageContext, messageChannel, listener, subscriberOptions)
        this.subscription= subscribe(this.context, SAMPLEMC, (message)=>{this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
    }


    handleMessage(message){
        this.recievedAccount = message.lmsData.value? message.lmsData.value :'NO Message published'
        if(this.recievedAccount !=null ||this.recievedAccount!='NO Message published'){
            getAllAccountsContacts({ accid: this.recievedAccount })
            .then(result => {
                console.log('result',result);
                this.tempacclist =[]
                this.accConList = result
                this.tempacclist.push(this.accConList.accRecord)
                console.log('acclist --> ' + JSON.stringify(this.accConList.accRecord));
                let tempaccRecs = []
                this.acclist =[]              
                this.tempacclist.forEach(item=>{  
                    let tempaccRec = Object.assign( {}, item );  
                    tempaccRec.accName = '/' + tempaccRec.Id;
                tempaccRecs.push( tempaccRec );
                })               
                this.conlist =[]
                let tempRecs = []              
                this.accConList.contactList.forEach(item=>{  
                    let tempRec = Object.assign( {}, item );  
                tempRec.CName = '/' + tempRec.Id;
                tempRecs.push( tempRec );          
                 
              })
              this.conlist=tempRecs
              this.acclist = tempaccRecs
              console.log('table acclist --> ' + JSON.stringify(this.acclist));
            })
            .catch(error => {
                console.error(error)
            });
        }
       
    }
    unsubscribeMessage(){
        unsubscribe(this.subscription)
        this.subscription = null
    }
   
}
