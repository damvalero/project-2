'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('../models/places');

router.get('/places', (req, res, next) => {
    Places.find({}, (error, places) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ places: places });
		}
	});
     });

router.post('/addPlace', (req, res, next) => {
   let name = req.body.name;
   let address = req.body.address;
   Places.create({ 
    name: name,
    address: address
    })
    .then(place => { 
        res.redirect('/private')
        console.log('The place is saved and its value is: ', place); 
    })
    .catch(err => { console.log('An error happened:', err)});
    });

module.exports = router;


