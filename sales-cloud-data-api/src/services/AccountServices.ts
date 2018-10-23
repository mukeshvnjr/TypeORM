import { Account } from '../entity/Account';
import { getManager } from "typeorm";

export class AccountService {

    public async createNewAccount(account: Account): Promise<Account> {
        const accountRepository = getManager().getRepository(Account);
        const saveAccount = await accountRepository.save(account);
        console.log(saveAccount)
        return saveAccount;
    }

    public async getAllAccount(): Promise<Account[]> {
        const accountRepository = getManager().getRepository(Account);
        const getAccount = await accountRepository.find();
        return getAccount;
    }

    public async  getAccountById(id: number): Promise<Account> {
        const accountRepository = getManager().getRepository(Account);
        const accountGetById = await accountRepository.findOne(id);
        return accountGetById;
    }

    public async updateAccountById(account: Account): Promise<Account> {
        const accountRepository = getManager().getRepository(Account);
        const accountEntity = await accountRepository.findOne(account.id);
        accountEntity.name = account.name;
        accountEntity.phone = account.phone;
        accountEntity.shippingstate = account.shippingstate;
        accountEntity.shippingpostalcode = account.shippingpostalcode;
        accountEntity.billingcity = account.billingcity;
        accountEntity.shippingcountry = account.shippingcountry;
        accountEntity.shippingstreet = account.shippingstreet;
        accountEntity.billingpostalcode = account.billingpostalcode;
        accountEntity.billingstate = account.billingstate;
        accountEntity.shippingcity = account.shippingcity;
        accountEntity.billingcountry = account.billingcountry;
        accountEntity.description = account.description;
        accountEntity.fax = account.fax;
        accountEntity.billingstreet = account.billingstreet;
        accountEntity._hc_lastop = account._hc_lastop;
        accountEntity._hc_err = account._hc_err;
        accountEntity.website = account.website;
        return await accountRepository.save(accountEntity); 
    }

    public async  deleteAccountById(id: number): Promise<Account> {
        const accountRepository = getManager().getRepository(Account);
        const deleteAccount: Account = await accountRepository.findOne(id);
        return await accountRepository.remove(deleteAccount); 
     }
}

export const accountServices = new AccountService();