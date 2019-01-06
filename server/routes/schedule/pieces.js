import Movement from '../../models/Movement'
import Piece from '../../models/Piece'
import {
    assertHasBodyParameters,
    assertHasObjectParameters,
    authenticateAndProtectRoute,
    authenticateRoute,
    callbackWithoutContent,
    updateModelWithBodyParameters,
} from '../util'

export default function projectRoutes(router) {
    router.get('/pieces', (req, res, next) => {
        authenticateRoute('jwt', req, res, next, user => {
            Piece.find().exec((err, pieces) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(pieces)
                }
            })
        })
    })

    router.put('/pieces', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                assertHasBodyParameters(req, res, [
                    'title',
                    'composerFirstName',
                    'composerLastName',
                    'movements',
                ])

                const movements = req.body.movements.map(movementData => {
                    assertHasObjectParameters(movementData, res, [
                        'title',
                        'sections',
                    ])

                    const movement = Movement({
                        title: movementData.title,
                        sections: movementData.sections,
                    })
                    movement(err => {
                        if (err) {
                            res.status(500).send(err)
                        }
                    })
                    return movement._id
                })

                const piece = new Piece({
                    title: req.body.title,
                    composerFirstName: req.body.composerFirstName,
                    composerLastName: req.body.composerLastName,
                    movements,
                })

                piece.save(err => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.json(piece)
                    }
                })
            }
        )
    })

    router.post('/pieces/:pieceId', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                Piece.findOne({ _id: req.params.pieceId }).exec(
                    (err, piece) => {
                        if (err) {
                            res.status(500).send(err)
                        } else {
                            updateModelWithBodyParameters(req, piece, [
                                'title',
                                'composerFirstName',
                                'composerLastName',
                                'movements',
                            ])

                            piece.save(err => {
                                if (err) {
                                    res.status(500).send(err)
                                } else {
                                    res.json(piece)
                                }
                            })
                        }
                    }
                )
            }
        )
    })

    router.delete('/pieces/:pieceId', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                Piece.deleteMany({ _id: req.params.pieceId }).exec(
                    callbackWithoutContent(res)
                )
            }
        )
    })
}
