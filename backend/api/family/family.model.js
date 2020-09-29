const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
	var FamilyMembers = sequelize.import('../family-members/family-members.model');

	let Family = sequelize.define(
		'dbo_families', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			  },
			  family_name: {
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

	Family.createFamily = (data = {}, transactionId = null) => {
		let options = {
			transaction: transactionId
		};
		return Family.create(data, options)
		.then((user) => {
			return user;
		})
		.catch((err) => {
			throw err;
		});
	}

	Family.deleteFamily = (options = {}, transactionId = null) => {

		let condition = {
			where: {
				id: options.family_id
			},
			transaction: transactionId
		};
		return Family.update({status:"0"},condition)
			.then((data) => {
				return data;
			})
			.catch((err) => {
				throw err;
			});

	}


	Family.list = async (params) => {
		let family=  await Family.findAll({
			offset: params.skip,
			limit: params.limit,
			page: params.page,
			include: [
				{
					model: DB.FamilyMembers,
					required: false,
					as:'family_member',
					attributes: [ 'name','id','gender' ],
					where: {
						status: '1'
					},
				}
			],
			where :{
				status: '1'
			}
		})
		let familyCount=  await Family.count({where:{
			status:"1"
		}})
		return {family,familyCount}
	}

	Family.hasMany(FamilyMembers, { foreignKey: 'family_id', targetKey: 'id',as:'family_member' });
	return Family;
};