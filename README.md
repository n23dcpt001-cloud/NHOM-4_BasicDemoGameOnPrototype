# 🎮 GAME DESIGN & PROTOTYPE – NHÓM 4

## 📌 Giới thiệu

Đây là project Prototype Game của **Nhóm 4**, được thực hiện trong môn **Lập Trình Game**.

Project tập trung vào việc nghiên cứu và áp dụng các kiến thức về **Game Design & Prototype**, bao gồm Gameplay, Game Mechanics, Level Design, UI/UX và xây dựng một prototype có thể chơi được trên trình duyệt.

---

## 👥 Thành viên nhóm

| STT | Họ và tên | Vai trò |
|-----|-----------|---------|
| 1 | **Lương Thái An** | Leader |
| 2 | **Nguyễn Thiện Quân** | Thành viên |
| 3 | **Đoàn Nguyễn Thanh Tài** | Thành viên |
| 4 | **Nguyễn Hữu Minh** | Thành viên |

---

## 📚 Nội dung bài học

Trong bài học, nhóm tìm hiểu và áp dụng các nội dung chính:

### 1. Gameplay
- Xây dựng cách người chơi tương tác với game.
- Xác định mục tiêu và vòng lặp gameplay.
- Thiết kế trải nghiệm chơi cơ bản.

### 2. Game Mechanics
- Cơ chế di chuyển Player.
- Cơ chế tấn công.
- Enemy AI.
- HP và Damage.
- Score.
- Game Over và Restart.

### 3. Level Design
- Xây dựng khu vực chơi.
- Xác định kích thước và giới hạn của Level.
- Thiết kế vị trí hoạt động của Player và Enemy.

### 4. UI/UX
- Hiển thị HP.
- Hiển thị Score.
- Hướng dẫn điều khiển.
- Màn hình Game Over.
- Nút Play Again.
- Đảm bảo giao diện dễ hiểu và dễ sử dụng.

### 5. Prototype
- Xây dựng prototype game có thể chơi được.
- Kiểm tra các gameplay mechanics trước khi phát triển thành game hoàn chỉnh.
- Đánh giá cách các thành phần của game hoạt động cùng nhau.

---

## 🎯 Mục đích và kết quả đạt được

Thông qua bài học và project, nhóm hướng đến các mục tiêu:

- Hiểu được những thành phần cơ bản trong quá trình thiết kế một game.
- Biết cách xây dựng Gameplay và Game Mechanics.
- Biết cách thiết kế Level và UI/UX cơ bản.
- Biết cách chuyển ý tưởng thiết kế thành một prototype có thể tương tác.
- Áp dụng kiến thức lập trình để xây dựng các cơ chế gameplay.
- Biết cách kiểm tra và đánh giá prototype thông qua quá trình chơi thử.

### ✅ Kết quả

Nhóm đã xây dựng được một **Basic Demo Game Prototype** trên nền tảng Web với các chức năng chính:

- Player di chuyển bằng **WASD / Arrow Keys**.
- Tấn công bằng **chuột trái**.
- Enemy tự động di chuyển về phía Player.
- Kiểm tra khoảng cách và hướng tấn công.
- Enemy nhận Damage và mất HP.
- Player nhận Damage khi Enemy tấn công.
- Score tăng khi tiêu diệt Enemy.
- Enemy mới được tạo sau khi Enemy cũ bị tiêu diệt.
- Game Over khi HP của Player về 0.
- Có chức năng **Play Again** để chơi lại.

---

## 🛠️ Công nghệ sử dụng

- **HTML** – xây dựng cấu trúc game.
- **CSS** – thiết kế giao diện.
- **JavaScript** – xử lý logic và gameplay.
- **HTML Canvas** – hiển thị các đối tượng trong game.
- **Visual Studio Code** – môi trường phát triển.

---

## 📁 Cấu trúc project

```text
BasicDemoOnPrototype/
│
├── index.html
├── style.css
└── game.js