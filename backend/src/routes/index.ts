import { PrismaClient } from '@prisma/client'
import express from "express";
import winston from 'winston';
const router = express.Router();
const prisma = new PrismaClient()

// winstonのカスタムフォーマット定義
const customFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const jstTimestamp = new Date(timestamp).toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-');

    return `${jstTimestamp} [${level.toUpperCase()}]: ${message}`;
  });

// ログ出力定義
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat),
  transports: [
    new winston.transports.Console()
  ]
});


// GET Todoリスト一覧取得
router.get('/todo/lists', async (req, res) => {
  try {
    logger.info("Request received: GET /todo/lists");
    const lists = await prisma.todolists.findMany();
    logger.info("Response status: 200 OK");
    return res.json(lists);
  } catch (e) {
    logger.error(`Response status: 500 message: ${e}`);
  }
});


// POST 新規タスク追加
router.post('/todo/lists', async (req, res) => {
  try {
    logger.info("Request received: POST /todo/lists");
    const task = await prisma.todolists.create({
      data: req.body
    })
    logger.info("Response status: 200 OK");
  } catch (e) {
    logger.error(`Response status: 500 message: ${e}`);
  }
});


// GET　タスク取得
router.get('/todo/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    logger.info(`Request received: GET /todo/tasks/${taskId}`);
    const tasks = await prisma.todolists.findUnique({
      where: {
        id: Number(taskId),
      },
    })
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(tasks);
    logger.info("Response status: 200 OK");
  } catch (e) {
    logger.error(`Response status: 500 message: ${e}`);
  }
})


// PUT タスク更新
router.put('/todo/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    logger.info(`Request received: PUT /todo/tasks/${taskId}`);
    const updataTask = await prisma.todolists.update({
      where: {
        id: Number(taskId),
      },
      data: req.body
    })
    logger.info("Response status: 200 OK");
  } catch (e) {
    logger.error(`Response status: 500 message: ${e}`);
  }
})


// DELETE タスク削除
router.delete('/todo/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id
    logger.info(`Request received: DELETE /todo/tasks/${taskId}`);
    const deleteTask = await prisma.todolists.delete({
      where: {
        id: Number(taskId),
      },
    })
    logger.info("Response status: 200 OK");
  } catch (e) {
    logger.error(`Response status: 500 message: ${e}`);
  }
})

module.exports = router;
