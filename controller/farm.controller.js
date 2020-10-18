const { FARM } = require('../models/farms.model');

exports.getFarmSize = function (req, res) {
  FARM.findOne({ _id: req.params.id })
    .populate('ponds')
    .exec(function (err, farmPonds) {

      if (err) {
        return res.status(500).send('an error has occured')
      }

      let totalsize = 0;
      totalPonds = farmPonds.ponds
      for (var i = 0; i < totalPonds.length; i++) {
        totalsize += totalPonds[i].size
      }
      res.status(200).send({ 'totalSize': totalsize.toFixed(3) })
    });
}

exports.checkFarmName = function (req, res, next) {
  FARM.findOne({ name: req.body.name }, function (err, obj) {
    if (err) {
      return res.status(500).send({ message: 'database Error' })
    } else {
      if (obj) {
        res.status(409).send({ farm: 'Farm already exists' })
      } else {
        req.farm = req.body;
        next();
      }
    }
  });
}

exports.createFarm = function (req, res) {
  let newFarm = new FARM({
    name: req.farm.name,
    createdBy: req.farm.createdBy,
    locationLat: req.farm.locationLat,
    locationLon: req.farm.locationLon,
  });
  newFarm.save(function (err) {
    if (err) {
      return res.status(500).send('Error creating new farm')
    }
    res.status(200).send({ message: 'New Farm Added', id: newFarm._id })
  })
}

exports.getAllFarms = function (req, res) {
  FARM.find(function (err, habitacion) {
    if (err) {
      console.log(err)
      return res.status(500).send('Error getting all farms');
    };
    res.status(200).send(habitacion);
  })
}

exports.getOneFarm = function (req, res) {
  FARM.findOne({ _id: req.params.id }, function (err, obj) {
    if (err) {
      return res.status(500).send('Cannot find farm by that id')
    } else {
      res.status(200).send(obj)
    }
  });
}

exports.removeFarm = function (req, res) {
  FARM.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      return res.status(500).send('Error deleting farm')
    } else {
      res.status(200).send('Farm deleted');
    }
  })
}

exports.updateFarm = async function (req, res) {
  try {
    let doc = await FARM.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      locationLat: req.body.locationLat,
      locationLon: req.body.locationLon,
      active: req.body.active
    });

    res.status(200).send(doc)
  } catch (err) {
    res.status(500).send('An error has occurred')
  }
}