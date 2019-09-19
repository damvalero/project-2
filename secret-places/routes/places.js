'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('../models/places');
const uploadCloud = require("../configurations/cloudinary.js");
const routeGuardMiddleware = require('../controllers/route-guard-middleware');

router.get('/places', routeGuardMiddleware, (req, res, next) => {
    Places.find({}, (error, places) => {
		if (error) { 
			next(error); 
		} else { 
			res.status(200).json({ places: places });
		}
	});
});
let today = new Date();

router.get('/add', routeGuardMiddleware, (req, res, next) => {
    res.render('add');
  });

  router.post('/addPlace', uploadCloud.single("file"), (req, res, next) => {
   let name = req.body.name;
   let location = req.body.location;
   let category = req.body.category;
   let description = req.body.description;
   let image = req.file.url;
   Places.create({ 
    name: name,
    time: today.getHours() + ":" + today.getMinutes(),
    addedBy: req.user.email,
    location: location,
    category: category,
    description: description,
    image: req.file.url
    })
    .then(place => { 
        res.redirect('/home')
        console.log('The place is saved and its value is: ', place); 
    })
    .catch(err => { console.log('An error happened:', err)});
    });

  router.get('/edit/:id', routeGuardMiddleware, (req, res, next) => {
    Places.findOne({_id: req.params.id})
  .then((place) => {
    res.render("edit", {place});
  })
  .catch((error) => {
    console.log(error);
  });
  });

  router.post('/edit/:id', routeGuardMiddleware, (req, res, next) => {
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
  Places.update({_id: req.params.id}, { $set: {name, category, description}})
  .then((place) => {
    res.redirect("/profile/" + req.user._id);
  })
  .catch((error) => {
    console.log(error);
  })
  });

  router.get('/delete/:id', routeGuardMiddleware, (req, res, next) => {
    Places.deleteOne({_id: req.params.id})
   .then((place) => {
    res.redirect("/profile/" + req.user._id);
    })
    .catch((error) => {
      console.log(error);
    });
    });


    router.get('/placeDetail/:id', routeGuardMiddleware, (req, res, next) => {
      const id = req.params.id
    Places.findById(id)
    .then((place) => {
      res.render("place-detail", {place});
    })
    .catch((error) => {
      console.log(error);
    });
    });

    router.post('/add-comment/:id', routeGuardMiddleware, (req, res, next) => {
      const id = req.params.id
      const newReview = {
        title: req.body.title,
        comment:req.body.comment
      }
    Places.findByIdAndUpdate(id, {
       $push: {reviews: newReview}
    })
    .then((place) => {
      res.redirect("/placeDetail/" + place._id)
    })
    .catch((error) => {
      console.log(error);
    });
    });
module.exports = router;


