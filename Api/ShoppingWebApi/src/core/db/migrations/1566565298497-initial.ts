import {MigrationInterface, QueryRunner, Table, TableColumn, TableIndex, TableForeignKey} from "typeorm";

export class initial1566565298497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        let tableItems: {
            table: Table,
            indices: TableIndex[],
            keys: TableForeignKey[]
        }[] = [];

        tableItems.push({
            table: new Table({
                name: 'sections',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'name', type: 'varchar',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']})
            ],
            keys: []
        });

        tableItems.push({
            table: new Table({
                name: 'brands',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'name', type: 'varchar',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']})
            ],
            keys: []
        });

        tableItems.push({
            table: new Table({
                name: 'tags',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'name', type: 'varchar',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']})
            ],
            keys: []
        });

        tableItems.push({
            table: new Table({
                name: 'types',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'name', type: 'varchar',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']})
            ],
            keys: []
        });

        tableItems.push({
            table: new Table({
                name: 'products',
                columns: [
                    new TableColumn({name: 'id',generationStrategy:'increment', type: 'int',isPrimary: true,isGenerated: true,isUnique: true,isNullable: false}),
                    new TableColumn({name: 'name', type: 'varchar',isPrimary: false,isGenerated: false,isUnique: false,isNullable: false}),
                    new TableColumn({name: 'brandId',type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: true}),
                    new TableColumn({name: 'sectionId',type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: true}),
                    new TableColumn({name: 'typeId',type: 'int',isPrimary: false,isGenerated: false,isUnique: false,isNullable: true}),
                ]
            }),
            indices: [
                new TableIndex({columnNames:['id']}),
                new TableIndex({columnNames:['brandId']}),
                new TableIndex({columnNames:['sectionId']}),
                new TableIndex({columnNames:['typeId']})
            ],
            keys: [
                new TableForeignKey({columnNames:['brandId'],referencedColumnNames:['id'],referencedTableName:'brands',onDelete:'CASCADE'} ),
                new TableForeignKey({columnNames:['sectionId'],referencedColumnNames:['id'],referencedTableName:'sections',onDelete:'CASCADE'} ),
                new TableForeignKey({columnNames:['typeId'],referencedColumnNames:['id'],referencedTableName:'types',onDelete:'CASCADE'} )
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
        await queryRunner.dropDatabase('shoppingdata',true);
    }

}
