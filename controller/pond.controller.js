const { FARM, POND } = require('../models/farms.model');

exports.createPond = function (req, res) {

    let newPond = new POND({
        farm: req.params.id,
        name: req.body.name,
        size: req.body.size,
        createdBy: req.body.createdBy,
    })

    newPond.save(function (err) {
        if (err) {
            res.send(err)
            return;
        }

        FARM.findOne({ _id: req.params.id }, function (err, farm) {
            if (err) {
                return res.status(500).send('Cannot find farm by that id')
            } else {
                farm.ponds.push(newPond);
                farm.save()
            }
        });
    })

    res.status(200).send('pond added')
}

exports.feedShrimp = function (req, res){
    POND.findOneAndUpdate({ _id: req.params.id }, { shrimpLastTimeFeed: new Date() }, function (err) {
        if (err) {
            return res.status(500).send('error in updating date');
        }
        console.log('shrimp feeded')
        res.status(200).send({'date': new Date()})
    })
}

exports.getPonds = function (req, res) {
    FARM.findOne({ _id: req.params.id })
        .populate('ponds')
        .exec(function (err, ponds) {
            if (err) {
                res.status(500).send('Error getting ponds')
                return;
            }
            res.status(200).send(ponds)
        });
}

exports.getOnePond = function (req, res) {
    POND.findOne({ _id: req.params.id }, function (err, obj) {
        if (err) {
            res.status(500).send('Cannot find Pond by that id')
        } else {
            res.status(200).send(obj)
        }
    });
}

exports.updatePond = async function (req, res){
    try{
        let doc = await POND.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            size: req.body.size,
            active: req.body.active
        });
    
        res.status(200).send(doc)
    }catch(err){
        console.log(err)
        res.status(500).send('An error has occurred')
    }
}

exports.deletePond = function (req, res) {

    try{
        POND.findOne({ '_id': req.params.id }, function (err, Pond) {
            if (err) {
                res.status(500).send('An error has occured');
                return
            };
            FARM.findOneAndUpdate({ _id: Pond.farm }, { $pull: { ponds: req.params.id } }, function (err) {
                if (err) {
                    return res.status(500).send('error in removing pond');
                }
            })
        });
    
        POND.deleteOne({ _id: req.params.id }, function (err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send('Pond deleted');
            }
        })
    }catch(e) {
        console.log(e)
    }
}