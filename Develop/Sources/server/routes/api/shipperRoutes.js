/**
 * Created by hoanglvq on 10/13/15.
 */

module.exports = function (app) {

    var shipperCtrl = require('./../../manages/shipperController')(app);

    app.route('/api/tasks')
        .get(function (req, res, next) {
            shipperCtrl.get(next).then(function (tasks) {
                res.status(200).json(tasks);
            })
        });

    app.route('/api/history')
        .get(function (req, res, next) {
            var shipperId = '1';
            shipperCtrl.getHistory(shipperId, next).then(function (tasks) {
                res.status(200).json(tasks);
            })
        });

}