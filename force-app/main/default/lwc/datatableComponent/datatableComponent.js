import { LightningElement,wire } from 'lwc';
import getAllContacts from '@salesforce/apex/AccountHandler.getAllContacts'
const columns = [
    {
        label: 'Contact Name',
        fieldName: 'ConName',
        type: 'url',
        typeAttributes: {label: { fieldName: 'conname' }, target: '_blank'}
    }, 
    {
        label: 'Account Name',
        fieldName: 'AccName',
        type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'accname'
            },
            target: '_blank'
        }}
];
export default class DatatableComponent extends LightningElement {
    consData = [];
    columns = columns;

    @wire(getAllContacts)
    contacts({ error, data }) {

        if (data) {
            let tempConList = []; 
            
            data.forEach((record) => {
                let tempConRec = Object.assign({}, record);  
                console.log('tempConRec***',tempConRec)
                console.log( JSON.stringify(tempConRec))
                tempConRec.ConName = '/' + tempConRec.conid;
                tempConRec.AccName = tempConRec.accid ?'/' + tempConRec.accid:null;
              
                tempConList.push(tempConRec);
                
            });
            
            this.consData = tempConList;
            this.error = undefined;

            console.table(this.consData);

        } else if (error) {
            this.error = result.error;
        }
    } 
}