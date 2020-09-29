const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
	let FamilyMembers = sequelize.define(
		'dbo_family_members', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			  },
			  family_id: {
				type: Sequelize.STRING(255),
				allowNull: true
			  },
			  name: {
				type: Sequelize.STRING(255),
				allowNull: true
			  },
			  gender: {
				type: Sequelize.STRING(100),
				allowNull: true
			  },
			  status: {
				type: Sequelize.STRING(10),
				allowNull: true,
				defaultValue:"1"
			  },
					createdAt: {
				field: 'created_at',
				type: DataTypes.DATE,
				defaultValue: Sequelize.NOW
			},
			updatedAt: {
				field: 'updated_at',
				type: DataTypes.DATE,
				defaultValue: Sequelize.NOW
			}
		}, {
			timestamps: true
		}
	);

	FamilyMembers.createFamilyMembers = (data = {}, transactionId = null) => {
		let options = {
			transaction: transactionId
		};
		return FamilyMembers.create(data, options)
		.then((user) => {
			return user;
		})
		.catch((err) => {
			throw err;
		});
	}
	FamilyMembers.deleteMembers = (options = {}, transactionId = null) => {

		let condition = {
			where: {
				id: options.family_member_id
			},
			transaction: transactionId
		};
		return FamilyMembers.update({status:"0"},condition)
			.then((data) => {
				return data;
			})
			.catch((err) => {
				throw err;
			});

	}


	return FamilyMembers;
};