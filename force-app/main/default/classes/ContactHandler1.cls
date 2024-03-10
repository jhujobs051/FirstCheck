public class ContactHandler1 {

    public static void updateAccount(List<contact> newconlist,Map<id,contact> oldconmap){
        list<contact> conlist = new list<contact>();
        if(oldconmap==null){
            for(contact c:newconlist){
                if(c.accountid!=null){
                  conlist.add(c);  
                }
            }
           
        }else{
            for(contact c:newconlist) {
                if(c.Accountid!=null && (c.Accountid!=oldconmap.get(c.id).Accountid ||c.Birthdate!=oldconmap.get(c.id).Birthdate) ){
                   conlist.add(c); 
                     conlist.add(oldconmap.get(c.id));
                }
            }
        }
       AccountManager1.updateAvgAgeofcontacts(conlist); 
    }
}