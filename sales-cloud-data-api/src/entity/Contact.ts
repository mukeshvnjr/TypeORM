import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Contact {

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"emailbouncedreason",
        })
    emailbouncedreason:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"mailingstate",
        })
    mailingstate:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"accountid"
        })
    accountid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"assistantname"
        })
    assistantname:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"name"
        })
    name:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"mobilephone"
        })
    mobilephone:string | null;
        
    @Column("date",{ 
        nullable:true,
        name:"birthdate"
        })
    birthdate:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"phone"
        })
    phone:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"mailingstreet"
        })
    mailingstreet:string | null;
        
    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"emailbounceddate"
        })
    emailbounceddate:Date | null;
        
    @Column("boolean",{ 
        nullable:true,
        name:"isdeleted"
        })
    isdeleted:boolean | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"homephone"
        })
    homephone:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"assistantphone"
        })
    assistantphone:string | null;
        
    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"systemmodstamp"
        })
    systemmodstamp:Date | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"department"
        })
    department:string | null;
        
    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"createddate"
        })
    createddate:Date | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"salutation"
        })
    salutation:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"title"
        })
    title:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"createdbyid"
        })
    createdbyid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"firstname"
        })
    firstname:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"email"
        })
    email:string | null;
        
    @Column("text",{ 
        nullable:true,
        name:"description"
        })
    description:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"fax"
        })
    fax:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"sfid"
        })
    sfid:string | null;
        
    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"_hc_lastop"
        })
    _hc_lastop:string | null;
        
    @Column("text",{ 
        nullable:true,
        name:"_hc_err"
        })
    _hc_err:string | null;     
}
//# sourceMappingURL=Contact.js.map