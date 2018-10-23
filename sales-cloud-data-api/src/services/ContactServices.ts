import { Contact } from '../entity/Contact';
import { getManager } from "typeorm";

export class AccountService {

    public async createNewContact(contact: Contact): Promise<Contact> {
        const contactRepository = getManager().getRepository(Contact);
        const saveContact = await contactRepository.save(contact);
        console.log(saveContact)
        return saveContact;
    }

    public async getAllContact(): Promise<Contact[]> {
        const contactRepository = getManager().getRepository(Contact);
        const getContact = await contactRepository.find();
        return getContact;
    }

    public async  getContactById(id: number): Promise<Contact> {
        const contactRepository = getManager().getRepository(Contact);
        const contactGetById = await contactRepository.findOne(id);
        return contactGetById;
    }

    public async updateContactById(contact: Contact): Promise<Contact> {
        const contactRepository = getManager().getRepository(Contact);
        const contactEntity = await contactRepository.findOne(contact.id);
        contactEntity.name = contact.name;
        contactEntity.mailingstate = contact.mailingstate;
        contactEntity.assistantname = contact.assistantname;
        contactEntity.mobilephone = contact.mobilephone;
        contactEntity.birthdate = contact.birthdate;
        contactEntity.phone = contact.phone;
        contactEntity.mailingstreet = contact.mailingstreet;
        contactEntity.salutation = contact.salutation;
        contactEntity.title = contact.title;
        contactEntity.firstname = contact.firstname;
        contactEntity.email = contact.email;
        contactEntity.description = contact.description;
        contactEntity.fax = contact.fax;
        contactEntity._hc_err = contact._hc_err;
        return await contactRepository.save(contactEntity); 
    } 

    public async  deleteContactById(id: number): Promise<Contact> {
        const contactRepository = getManager().getRepository(Contact);
        const deleteContact: Contact = await contactRepository.findOne(id);
        return await contactRepository.remove(deleteContact); 
     }
}

export const contactServices = new AccountService();