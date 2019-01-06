import Project from '../../models/Project'
import {
    assertHasBodyParameters,
    authenticateAndProtectRoute,
    authenticateRoute,
    callbackWithoutContent,
    updateModelWithBodyParameters,
} from '../util'

export default function projectRoutes(router) {
    router.get('/projects', (req, res, next) => {
        authenticateRoute('jwt', req, res, next, user => {
            Project.find()
                .populate('pieces')
                .populate('rehearsals')
                .populate('concerts')
                .exec((err, projects) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.json(projects)
                    }
                })
        })
    })

    router.get('/projects/active', (req, res, next) => {
        authenticateRoute('jwt', req, res, next, user => {
            Project.find({ isActive: true })
                .populate('pieces')
                .populate('rehearsals')
                .populate('concerts')
                .exec((err, projects) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.json(projects)
                    }
                })
        })
    })

    router.put('/projects', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                assertHasBodyParameters(req, res, [
                    'name',
                    'isActive',
                    'pieces',
                ])

                const project = new Project({
                    name: req.body.name,
                    isActive: req.body.isActive,
                    pieces: req.body.pieces,
                    rehearsals: [],
                    concerts: [],
                })

                project.save(err => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.json(project)
                    }
                })
            }
        )
    })

    router.post('/projects/:projectId', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                Project.findOne({ _id: req.params.projectId }).exec(
                    (err, project) => {
                        if (err) {
                            res.status(500).send(err)
                        } else {
                            updateModelWithBodyParameters(req, project, [
                                'name',
                                'isActive',
                                'pieces',
                                'rehearsals',
                                'concerts',
                            ])

                            project.save(err => {
                                if (err) {
                                    res.status(500).send(err)
                                } else {
                                    res.json(project)
                                }
                            })
                        }
                    }
                )
            }
        )
    })

    router.delete('/projects/:projectId', (req, res, next) => {
        authenticateAndProtectRoute(
            'jwt',
            req,
            res,
            next,
            'SCHEDULER',
            user => {
                Project.deleteMany({ _id: req.params.projectId }).exec(
                    callbackWithoutContent(res)
                )
            }
        )
    })
}
