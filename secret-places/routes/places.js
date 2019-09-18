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
let today = new Date();


router.get('/add', (req, res, next) => {
    res.render('add');
  });

router.post('/addPlace', (req, res, next) => {
   let name = req.body.name;
   let location = req.body.location;
   let category = req.body.category;
   let description = req.body.description;
   Places.create({ 
    name: name,
    time: today.getHours() + ":" + today.getMinutes(),
    location: location,
    category: category,
    description: description
    })
    .then(place => { 
        res.redirect('/home')
        console.log('The place is saved and its value is: ', place); 
    })
    .catch(err => { console.log('An error happened:', err)});
    });

module.exports = router;


