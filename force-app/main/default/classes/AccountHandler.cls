public with sharing class AccountHandler {
   
  /*  @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        return [select id,name from account with SECURITY_ENFORCED LIMIT 20];
    }


    @AuraEnabled(cacheable=true)
    public static AccountContactListWrapper getAllAccountsContacts(string accid){       
       Account acc =[select Id,Name,Industry,(select Id,Name,Email,phone from Contacts) from account where id=:accid with SECURITY_ENFORCED];
       AccountContactListWrapper accWrapper = new AccountContactListWrapper();
       Account acc1 = new Account(Id = acc.Id, Name = acc.Name, Industry = acc.Industry);
                accWrapper.accRecord = acc1;
               
                if(acc.Contacts.size()>0){
                    accWrapper.contactList = acc.Contacts;
                }else{
                    accWrapper.contactList = null;
                }
          return  accWrapper;
    }


    public class AccountContactListWrapper{
        @AuraEnabled
        public Account accRecord{get;set;}
        @AuraEnabled
        public List<Contact> contactList{get;set;}      
       
    }*/

    @AuraEnabled(cacheable=true)
    public static List<contactWithAccountWrapper> getAllContacts(){
        List<contactWithAccountWrapper> cwlist = new List<contactWithAccountWrapper>();
        for(contact c:[select id,name,AccountId,Account.Name from contact with SECURITY_ENFORCED LIMIT 20]){
            contactWithAccountWrapper cw = new contactWithAccountWrapper();
            cw.accname=c.Account.Name;
            cw.accid=c.AccountId;
            cw.conid=c.id;
            cw.conname=c.name;
            cwlist.add(cw); 
        }
        return cwlist;
    } 

    public class contactWithAccountWrapper{
        @AuraEnabled
        public String accname{get;set;}
        @AuraEnabled
        public String accid{get;set;}
        @AuraEnabled
        public String conid{get;set;} 
        @AuraEnabled
        public String conname{get;set;}
    }
}
