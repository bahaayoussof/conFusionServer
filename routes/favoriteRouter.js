const express = require('express');
const bodyParser = require('body-parser');

var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');
const user = require('../models/user');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .then((favorites) => {
                if (favorites.length == 1) {
                    for (let dish of req.body) {
                        if (favorites[0].dishes.indexOf(dish._id) == -1) {
                            favorites[0].dishes.push(dish._id);
                        }
                    }
                    favorites[0].save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        })
                }
                else {
                    Favorites.create(new Favorites({ user: req.user._id }))
                        .then((favorite) => {
                            favorite.dishes = req.body;
                            favorite.save()
                                .then((favorite) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(favorite);
                                })
                        })

                }
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .then((favorites) => {
                if (favorites.length == 1) {
                    if (favorites[0].dishes.indexOf(req.params.dishId) == -1) {
                        favorites[0].dishes.push(req.params.dishId);
                    }

                    favorites[0].save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        })
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.find({})
            .then((favorites) => {
                // let newFavorites = favorites[0].dishes.reduce
                //     ((acc, curr) => curr._id != req.params.dishId ? acc.concat(curr) : acc, [])
                // favorites[0].dishes = newFavorites;

                // let newFavorites = favorites[0].dishes.filter(d => d._id != req.params.dishId);
                // favorites[0].dishes = newFavorites;

                let index = favorites[0].dishes.indexOf(req.params.dishId);
                if (index != -1) {
                    favorites[0].dishes.splice(index, 1);
                }

                favorites[0].save()
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
            })
    });
module.exports = favoriteRouter;