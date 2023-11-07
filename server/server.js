const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

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
