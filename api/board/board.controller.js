const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const boardService = require('./board.service')
const asyncLocalStorage = require('../../services/als.service')

async function getMiniBoards(req, res) {
    try {
        // req.query
        const boards = await boardService.query()
        res.send(boards)
    } catch (err) {
        logger.error('Cannot get boards', err)
        res.status(500).send({ err: 'Failed to get boards' })
    }
}

async function findBoard(req, res) {
    try {
        const boardId = req.params.id
        const board = await boardService.getById(boardId)
        res.json(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}
async function updateStarFromWorkspace(req, res) {
    try {
        const boardId = req.params.id
        console.log('boardId', boardId)
        const board = await boardService.getById(boardId)
        board.isStarred = !board.isStarred
        await boardService.update(board)
        // return ???
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })
    }
}


async function addBoard(req, res) {
    try {
        const board = req.body
        const addedBoard = await boardService.add(board)
        res.json(addedBoard)
    } catch (err) {
        logger.error('Failed to add board', err)
        res.status(500).send({ err: 'Failed to add board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        // console.log('before', board)
        const id = board._id
        // console.log('from line 44', board._id)
        const updatedBoard = await boardService.update(board)
        const store = asyncLocalStorage.getStore()
        updatedBoard._id = id
        // console.log('after', updatedBoard)
        // socketService.broadcast('emit-board-change', updatedBoard, id, store.loggedinUser._id)
        socketService.broadcast('emit-board-change', id, id, store.loggedinUser._id)
        res.json(updatedBoard)
    } catch (err) {
        logger.error('Failed to update board', err)
        res.status(500).send({ err: 'Failed to update board' })

    }
}

async function removeBoard(req, res) {
    try {
        const boardId = req.params.id
        const removedId = await boardService.remove(boardId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove board', err)
        res.status(500).send({ err: 'Failed to remove board' })
    }
}




module.exports = {
    getMiniBoards,
    findBoard,
    updateBoard,
    addBoard,
    removeBoard,
    updateStarFromWorkspace
}