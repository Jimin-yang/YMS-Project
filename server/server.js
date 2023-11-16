const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3001;

// 데이터베이스 연결
let db = new sqlite3.Database('../DataBase/movieDB.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the movieDB database.');
});

// 데이터베이스 테이블 조회 (테스트용_콘솔에 테이블 표시됨)
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
  if (err) {
    throw err;
  }
  tables.forEach((table) => {
    console.log(table.name);
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
  console.log(`Server is running on port ${PORT}`);
});