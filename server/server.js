const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const models = require('../models'); // models 모듈을 가져오는 부분에서 오류 발생 가능성이 있습니다. 정의된 모듈이 아니라면 수정이 필요합니다.

const app = express();
const PORT = process.env.PORT || 3001;
const dbPath = '../DataBase/movieDB.db';

// 데이터베이스 연결
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the movieDB database.');

    // 영화 데이터를 제공하는 엔드포인트
    app.get('/api/movies', (req, res) => {
      db.all('SELECT * FROM Movies', [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });
    });

    // 정적 파일을 제공할 디렉토리 설정
    app.use(express.static(path.join(__dirname, '../build')));

    // 모든 요청을 React 앱으로 라우팅
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    // 서버 시작
    app.listen(PORT, () => {
      console.log('서버가 동작중입니다.');
      // sequelize와 데이터베이스 연결작업
      // 데이터베이스 동기화
      models.sequelize
        .sync()
        .then(() => {
          console.log('DB연결 성공');
        })
        .catch((e) => {
          console.error(e);
          console.log('DB연결 에러');
          // 서버실행이 안되면 프로세서를 종료
          process.exit();
        });
    });
  }
});