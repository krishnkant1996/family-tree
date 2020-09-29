const { familyRoutes } = require('../api/family');
const { familyMembersRoutes } = require('../api/family-members');
let { responses } = require('../utils')

const initialize = (app) => {
    app.use('/api/family', familyRoutes);
    app.use('/api/family-members', familyMembersRoutes);

    app.use(function(req, res, next) {
        if (!req.route) {
            responses.response(res, false, '', 'en', 'NOT_FOUND', HTTP_STATUS.NOT_FOUND);
        }
    });
};

module.exports = { initialize };