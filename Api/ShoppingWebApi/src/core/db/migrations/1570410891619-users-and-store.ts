import { MigrationInterface, QueryRunner, Table, TableColumn, getConnection, TableIndex, TableForeignKey } from "typeorm";
import { Accounts, Users, Transactions, Stores } from "../models";
import * as bcrypt from 'bcrypt';

export class usersAndStore1570410891619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        try {

        
        let accountTable = new Table({
            name: 'accounts', columns: [
                new TableColumn({ name: 'id', generationStrategy: 'increment', type: 'int', isPrimary: true, isGenerated: true, isUnique: true, isNullable: false }),
            ]
        });
        await queryRunner.createTable(accountTable);
        let userTable = new Table({
            name: 'users', columns: [
                new TableColumn({ name: 'id', generationStrategy: 'increment', type: 'int', isPrimary: true, isGenerated: true, isUnique: true, isNullable: false }),
                new TableColumn({ name: 'firstName', type: 'varchar', isNullable: false }),
                new TableColumn({ name: 'lastName', type: 'varchar', isNullable: false }),
                new TableColumn({ name: 'userName', type: 'varchar', isUnique: true, isNullable: false }),
                new TableColumn({ name: 'email', type: 'varchar', isUnique: true, isNullable: false }),
                new TableColumn({ name: 'password', type: 'varchar', isNullable: false }),
                new TableColumn({ name: 'isAdmin', type: 'boolean', isNullable: false, default: false }),
                new TableColumn({ name: 'isSuper', type: 'boolean', isNullable: false, default: false }),
                new TableColumn({ name: 'accountId', type: 'int', isNullable: false, default: 1 }),
            ],
            indices: [
                new TableIndex({ columnNames: ['userName'] }),
                new TableIndex({ columnNames: ['email'] }),
                new TableIndex({ columnNames: ['accountId'] })
            ],
            foreignKeys: [
                new TableForeignKey({ columnNames: ['accountId'], referencedTableName: 'accounts', referencedColumnNames: ['id'] })
            ]
        });

        await queryRunner.createTable(userTable);

        let accounts = [];
        accounts.push(new Accounts());
        accounts.push(new Accounts());
        for (const account of accounts) {
            await getConnection().getRepository(Accounts).insert(account);
        }
        let user = new Users();

        user.userName = process.env.BASE_USERNAME.toLowerCase();
        user.email = process.env.BASE_EMAIL;
        user.password = await bcrypt.hashSync(process.env.BASE_PASSWORD, Number(process.env.PASSWORD_SALT_ROUNDS));
        user.firstName = 'Evan';
        user.lastName = 'Graessley';
        user.isAdmin = true;
        user.isSuper = true;
        user.account = accounts[0];
        await getConnection().getRepository(Users).insert(user);
        user.userName = 'grussles';
        user.email = "egraessley07@yahoo.com"
        user.isSuper = false;
        user.account = accounts[1];
        delete user.id;
        await getConnection().getRepository(Users).insert(user);

        await queryRunner.createTable(new Table({
            name: 'stores', columns: [
                new TableColumn({ name: 'id', generationStrategy: 'increment', type: 'int', isPrimary: true, isGenerated: true, isUnique: true, isNullable: false }),
                new TableColumn({ name: 'name', type: 'varchar', isNullable: false, isUnique: true }),
                new TableColumn({ name: 'accountId', type: 'int', isNullable: false })
            ],
            indices: [
                new TableIndex({ columnNames: ['accountId'] })
            ],
            foreignKeys: [
                new TableForeignKey({ columnNames: ['accountId'], referencedColumnNames: ['id'], referencedTableName: 'accounts' })
            ]
        }));

        await queryRunner.addColumn('transactions', new TableColumn({ name: 'storeId', type: 'int', isNullable: true }));
        await queryRunner.createIndex('transactions', new TableIndex({ columnNames: ['storeId'] }));
        await queryRunner.createForeignKey('transactions', new TableForeignKey({ columnNames: ['storeId'], referencedColumnNames: ['id'], referencedTableName: 'stores' }));
        await queryRunner.addColumn('transactions', new TableColumn({ name: 'accountId', type: 'int', isNullable: true }));
        await queryRunner.createIndex('transactions', new TableIndex({ columnNames: ['accountId'] }));
        await queryRunner.createForeignKey('transactions', new TableForeignKey({ columnNames: ['accountId'], referencedColumnNames: ['id'], referencedTableName: 'accounts' }));

        let tableNames = ['brands', 'products', 'tags', 'types','sections']
        for (const tableName of tableNames) {
            await queryRunner.addColumn(tableName, new TableColumn({ name: 'accountId', type: 'int', isNullable: true }));
            await queryRunner.createIndex(tableName, new TableIndex({ columnNames: ['accountId'] }));
            await queryRunner.createForeignKey(tableName, new TableForeignKey({ columnNames: ['accountId'], referencedColumnNames: ['id'], referencedTableName: 'accounts' }));
            let models = await getConnection().getRepository(tableName).find();
            for (const model of models) {
                (<any>model).account = accounts[1];
                await getConnection().getRepository(tableName).save(model);
            }
        }
        let transactions = await getConnection().getRepository(Transactions).find();
        let store = new Stores();
        store.name = 'Kroger';
        store.account = accounts[1];
        await getConnection().getRepository(Stores).insert(store);
        for (let transaction of transactions) {
            transaction.store = store;
            transaction.account = accounts[1];
            await getConnection().getRepository(Transactions).save(transaction);
        }
        for (const tableName of tableNames) {
            let table = await queryRunner.getTable(tableName);
            let column = table.columns.find(x => x.name === 'accountId')
            let newColumn = new TableColumn(column);
            newColumn.isNullable = false;
            await queryRunner.changeColumn(table, column, newColumn);
        }
        let table = await queryRunner.getTable('transactions');
        let column = table.columns.find(x => x.name === 'storeId')
        let newColumn = new TableColumn(column);
        newColumn.isNullable = false;
        await queryRunner.changeColumn(table, column, newColumn);
        } catch (e) 
        {
            console.error(e);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        try {

            let tableNames = ['brands', 'products', 'tags', 'types', 'transactions','sections']
            for (const tableName of tableNames) {
                let table = await queryRunner.getTable(tableName);
                let index = table.indices.find(x => x.columnNames.some(y => y === 'accountId'));
                let fk = table.foreignKeys.find(x => x.columnNames.some(y => y === 'accountId'));
                let column = table.columns.find(x => x.name === 'accountId');
                if (fk)
                    await queryRunner.dropForeignKey(table, fk);
                if (index)
                    await queryRunner.dropIndex(table, index);
                if (column)
                    await queryRunner.dropColumn(table, column);
            }
            let table = await queryRunner.getTable('transactions');
            let index = table.indices.find(x => x.columnNames.some(y => y === 'storeId'));
            let fk = table.foreignKeys.find(x => x.columnNames.some(y => y === 'storeId'));
            let column = table.columns.find(x => x.name === 'storeId');
            if (fk)
                await queryRunner.dropForeignKey(table, fk);
            if (index)
                await queryRunner.dropIndex(table, index);
            if (column)
                await queryRunner.dropColumn(table, column);
            table = await queryRunner.getTable('stores');
            if (table)
                await queryRunner.dropTable(table,true,true,true);
            table = await queryRunner.getTable('users');
            if (table)
                await queryRunner.dropTable(table,true,true,true);
            table = await queryRunner.getTable('accounts');
            if (table)
                await queryRunner.dropTable(table,true,true,true);
        } catch (e) {
            console.error(e);
        }
    }

}
