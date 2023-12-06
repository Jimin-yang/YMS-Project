const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const models = require('../models'); // models 모듈을 가져오는 부분에서 오류 발생 가능성이 있습니다. 정의된 모듈이 아니라면 수정이 필요합니다.

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
const dbPath = '../DataBase/movieDB.db';

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the movieDB database.');

    // 영화 데이터를 제공하는 엔드포인트
    app.get('/api/selection-data', (req, res) => {
      const query = `
        SELECT MovieShowings.id, Movies.image AS movieImage, Movies.title AS movieTitle, Theaters.name AS theater, Times.value AS time
        FROM MovieShowings
        INNER JOIN Movies ON MovieShowings.movieid = Movies.movieid
        INNER JOIN Theaters ON MovieShowings.theaterid = Theaters.theaterid
        INNER JOIN Times ON MovieShowings.timeid = Times.timeid
      `;

      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });
    });

    // 영화 좌석 데이터를 제공하는 엔드포인트
    app.get('/api/seats', (req, res) => {
      db.all('SELECT * FROM Seats', [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });
    });

    // 삭제 엔드포인트 예시
    app.delete('/api/movies/:title', (req, res) => {
      const movieTitleToDelete = req.params.title;

      // 여기에서 movieDB.db에서 movieTitleToDelete와 일치하는 항목을 삭제하는 코드를 작성
      // ...

      res.status(200).json({ message: `Deleted movie with title: ${movieTitleToDelete}` });
    });

    // 수정 엔드포인트 예시
    app.put('/api/movies/:title', (req, res) => {
      const movieTitleToUpdate = req.params.title;
      const updatedData = req.body; // 수정할 데이터는 요청의 body에서 받아옴

      // 여기에서 movieDB.db에서 movieTitleToUpdate와 일치하는 항목을 업데이트하는 코드를 작성
      // ...

      res.status(200).json({ message: `Updated movie with title: ${movieTitleToUpdate}` });
    });

    // Payment 정보를 Receipt 테이블에 저장하는 엔드포인트
    app.post('/api/payment', (req, res) => {
      const {
        movieTitle,
        theater,
        time,
        selectedSeats,
        childCount,
        adultCount,
        // 추가적으로 필요한 데이터가 있다면 이곳에 추가
      } = req.body;
    
      // 여기에서 Receipt 테이블에 데이터를 삽입하는 쿼리를 작성
      const insertQuery = `
        INSERT INTO Receipt (movieTitle, theater, showTime, selectedSeats, childCount, adultCount)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    
      db.run(
        insertQuery,
        [movieTitle, theater, time, selectedSeats.join(', '), childCount, adultCount],
        function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status(200).json({ message: 'Payment information saved successfully' });
          }
        }
      );
    });

    app.use(express.static(path.join(__dirname, '../build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log('서버가 동작중입니다.');

      models.sequelize
        .sync()
        .then(() => {
          console.log('DB연결 성공');
        })
        .catch((e) => {
          console.error(e);
          console.log('DB연결 에러');
          process.exit();
        });
    });
  }
});