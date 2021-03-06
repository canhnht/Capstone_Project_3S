/**
 * Created by Cao Khanh on 21/10/2015.
 */
var _ = require('lodash');

module.exports = function (app) {
    var db = app.get('models');

    var params = function (req, res, next, order_id) {
        return db.order.getOneOrderDetail(order_id)
            .then(function (order) {
                if (order) {
                    req.ss = order;
                    next();
                } else {
                    next(new Error('No order with id'));
                }

            }, function (err) {
                next(err);
            });
    };

    var getAllOrder = function (req, res, next) {
        var orderStatus = db.orderstatus;
        var order = db.order;
        order.belongsTo(orderStatus, {
            foreignKey: {
                name: 'statusid'
            }
        });
        var storeid = 'str1';
        return order.storeGetAllOrders(orderStatus, storeid)
            .then(function (orders) {
                //console.log(orders);
                var listOrders = [];
                _.each(orders, function(order){
                    listOrders.push({
                        'orderid': order.dataValues.orderid,
                        'statusname': order['orderstatus'].dataValues.statusname,
                        'deliveryaddress': order.dataValues.deliveryaddress,
                        'recipientname' : order.dataValues.recipientname,
                        'recipientphone' : order.dataValues.recipientphone,
                        'isdraff': order.dataValues.isdraff,
                        'iscancel':order.dataValues.iscancel,
                        'ispending': order.dataValues.ispending
                    })
                });
                var group = {};
                group['Draff'] = group['Draff'] || [];
                group['Issue'] = group['Issue'] || [];
                group['Done'] = group['Done'] || [];
                group['Inprocess'] = group['Inprocess'] || [];
                _.each(listOrders, function(item) {
                    if(item['isdraff']) {
                        group['Draff'].push(item);
                    } else if(item['iscancel']) {
                        group['Issue'].push(item);
                    }else if(_.isEqual(item['statusname'],'Done')){
                        group['Done'].push(item);
                    } else{
                        group['Inprocess'].push(item);
                    }
                });


                res.status(200).json(group);
            }, function (err) {
                next(err);
            })
    };
    var getOne = function (req, res, next) {
        res.status(200).json(req.ss);

    };

    var post = function (req, res, next) {
        var newOrder = req.body;
        return db.order.postOneOrder(newOrder)
            .then(function (order) {
                res.status(201).json(order);
            }, function(err){
                next(err);
            })
            ;    };

    var put = function (req, res, next) {
        var order = req.order;
        var update = req.body;

        order.storeid = update.storeid;
        order.ordertypeid = update.ordertypeid;
        order.pickupaddress = update.pickupaddress;
        order.deliveryaddress = update.deliveryaddress;
        order.pickupdate = update.pickupdate;
        order.deliverydate = update.deliverydate;
        order.recipientphone = update.recipientphone;
        order.recipientname = update.recipientname;

        return db.order.putOrder(order)
            .then(function(save){
                if(save){
                    res.status(201).json(order);
                }else {
                    next( new Error('Cannot save user'));
                }
            })
    }


    return {
        getAllOrder: getAllOrder,
        getOne: getOne,
        postOne: post,
        params: params,
        put : put
    }
}