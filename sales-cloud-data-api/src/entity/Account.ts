import { Entity,PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Account {

    @Column("double precision",{ 
        nullable:true,
        precision:53,
        name:"shippinglongitude"
        })
    shippinglongitude:number | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"shippingstate"
        })
    shippingstate:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:20,
        name:"shippingpostalcode"
        })
    shippingpostalcode:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"billingcity"
        })
    billingcity:string | null;
        
    @Column("double precision",{ 
        nullable:true,
        precision:53,
        name:"billinglatitude"
        })
    billinglatitude:number | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"accountsource"
        })
    accountsource:string | null;  

    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"shippingcountry"
        })
    shippingcountry:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"shippinggeocodeaccuracy"
        })
    shippinggeocodeaccuracy:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"name"
        })
    name:string | null;
        
    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"lastmodifieddate"
        })
    lastmodifieddate:Date | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"phone"
        })
    phone:string | null;
        
    @Column("boolean",{ 
        nullable:true,
        name:"isdeleted"
        })
    isdeleted:boolean | null;
        
    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"systemmodstamp"
        })
    systemmodstamp:Date | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"lastmodifiedbyid"
        })
    lastmodifiedbyid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"shippingstreet"
        })
    shippingstreet:string | null;
    
    @Column("character varying",{ 
        nullable:true,
        length:20,
        name:"billingpostalcode"
        })
    billingpostalcode:string | null;
        
    @Column("double precision",{ 
        nullable:true,
        precision:53,
        name:"billinglongitude"
        })
    billinglongitude:number | null;
        
    @Column("timestamp without time zone",{ 
        nullable:true,
        name:"createddate"
        })
    createddate:Date | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"billingstate"
        })
    billingstate:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"shippingcity"
        })
    shippingcity:string | null;
        
    @Column("double precision",{ 
        nullable:true,
        precision:53,
        name:"shippinglatitude"
        })
    shippinglatitude:number | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"type"
        })
    type:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"billingcountry"
        })
    billingcountry:string | null;
        
    @Column("text",{ 
        nullable:true,
        name:"description"
        })
    description:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"billinggeocodeaccuracy"
        })
    billinggeocodeaccuracy:string | null;
    
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"fax"
        })
    fax:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:80,
        name:"sicdesc"
        })
    sicdesc:string | null;  

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"billingstreet"
        })
    billingstreet:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"sfid"
        })
    sfid:string | null;
        
    @PrimaryGeneratedColumn({
        name:"id"
        })
    id:number;
        
    @Column("character varying",{ 
        nullable:true,
        length:32,
        name:"_hc_lastop"
        })
    _hc_lastop:string | null;
        
    @Column("text",{ 
        nullable:true,
        name:"_hc_err"
        })
    _hc_err:string | null;
        
    @Column("integer",{ 
        nullable:true,
        name:"numberofemployees"
        })
    numberofemployees:number | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"parentid"
        })
    parentid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"masterrecordid"
        })
    masterrecordid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"ownerid"
        })
    ownerid:string | null;
        
    @Column("date",{ 
        nullable:true,
        name:"lastactivitydate"
        })
    lastactivitydate:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:18,
        name:"createdbyid"
        })
    createdbyid:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"website"
        })
    website:string | null;  

    @Column("character varying",{ 
        nullable:true,
        length:255,
        name:"photourl"
        })
    photourl:string | null;
        
    @Column("character varying",{ 
        nullable:true,
        length:40,
        name:"industry"
        })
    industry:string | null;
        
}
