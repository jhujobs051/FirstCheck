import { LightningElement,api } from 'lwc'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class CreateRelatedContact extends LightningElement {
     @api selectedAccountid

    closeHandler(){
        const myEvent = new CustomEvent('close')
        this.dispatchEvent(myEvent)
    }
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields)
        const fields = event.detail.fields
       
    }
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm', event.detail.id)
       // this.showToast("Sucess!!", "Contact Created Successfully!!" , 'success')
    }
    handleError(event){
       
    }
    submitHandler(event){
        event.preventDefault();
        let isVal = true
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        })  
        console.log('isVal',isVal)  
        if (isVal) {           
            const inputFields = event.detail.fields           
            this.template.querySelector('lightning-record-edit-form').submit(inputFields)
            this.showToast("Sucess!!", "Contact Created Successfully!!" , 'success')
        }else{
            
            this.showToast("Error!!", "Error Occurred While Creating a Contact!!", 'error')

         }
        }


    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }))
        if(variant==='success'){
            this.closeHandler()
        }
        
    }

}
