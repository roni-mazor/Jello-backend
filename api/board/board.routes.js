const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getMiniBoards,updateStarFromWorkspace, findBoard, updateBoard, addBoard, removeBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getMiniBoards)
router.get('/:id', log, findBoard)
router.put('/:id', log, updateBoard)  //requireAuth
router.put('/star/:id', log, updateStarFromWorkspace)  //requireAuth
router.post('/', log, addBoard)  //requireAuth
router.delete('/:id', log, removeBoard)  //requireAuth

module.exports = router