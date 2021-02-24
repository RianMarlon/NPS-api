import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createUsers1614100333432 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'email',
					type: 'varchar',
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'current_timestamp',
				},
			],
			uniques: [
        {
          name: 'uq_users_email',
          columnNames: ['email']
        }
      ]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}

}
