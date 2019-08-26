import {MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey, TableColumn} from "typeorm";

export class transactions1566656253270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        let tableItems: {
            table: Table,
            indices: TableIndex[],
            keys: TableForeignKey[]
        }[] = [];

        tableItems.push({
            table: new Table({
                name: 'transactions',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'date',type: 'datetime',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false, default: 'CURRENT_TIMESTAMP'}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']})
            ],
            keys: []
        });

        tableItems.push({
            table: new Table({
                name: 'order_items',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'date',type: 'datetime',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false, default: 'CURRENT_TIMESTAMP'}),
                    new TableColumn({name: 'price',type: 'decimal',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false,default:0.00}),
                    new TableColumn({name: 'quantity', type: 'decimal',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                    new TableColumn({name: 'productId', type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                    new TableColumn({name: 'transactionId', type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']}),
                new TableIndex({columnNames:['productId']}),
                new TableIndex({columnNames:['transactionId']})
            ],
            keys: [
                new TableForeignKey({columnNames:['productId'],referencedColumnNames:['id'],referencedTableName:'products'} ),
                new TableForeignKey({columnNames:['transactionId'],referencedColumnNames:['id'],referencedTableName:'transactions'}),
            ]
        });

        tableItems.push({
            table: new Table({
                name: 'order_items_to_tag',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'tagId', type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                    new TableColumn({name: 'orderItemId', type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']}),
                new TableIndex({columnNames:['tagId']}),
                new TableIndex({columnNames:['orderItemId']})
            ],
            keys: [
                new TableForeignKey({columnNames:['tagId'],referencedColumnNames:['id'],referencedTableName:'tags'} ),
                new TableForeignKey({columnNames:['orderItemId'],referencedColumnNames:['id'],referencedTableName:'order_items'}),
            ]
        });

        for(const item of tableItems) 
        {
            await queryRunner.createTable(item.table);
            for (const ind of item.indices)
            {
                await queryRunner.createIndex(item.table,ind);
            }
            for(const key of item.keys)
            {
                await queryRunner.createForeignKey(item.table,key);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        let transactionTable = await queryRunner.getTable('transactions');
        let orderItemTable = await queryRunner.getTable('order_items');
        let tagstable = await queryRunner.getTable('order_items_to_tag');
        if(tagstable) {
            await queryRunner.dropTable(tagstable,true,true,true);
        }
        if(orderItemTable) {
            await queryRunner.dropTable(orderItemTable,true,true,true);
        }
        if(transactionTable) {
            await queryRunner.dropTable(transactionTable,true,true,true);
        }
    }

}
