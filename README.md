# NT144
Quy trình làm việc

  Khi có thay đổi trên repo chung (leader thông báo) thì pull về
  Khi có cập nhật code ở local thì làm theo các bước: 
    -> git checkout sang nhánh của mình 
    -> git pull 
    -> git add 
    -> git commit -m "comment của mình"
    -> git push 
    -> nhấn compare và tạo pull request trên github (nếu không có nút đó thì nhấn dòng chữ xanh xx commits ahead khi chuyển qua nhánh của mình trên github) 
    -> chờ main xử lý request
  Khuyến khích luôn giữ ở local là nhánh của mình, khi có cập nhật lớn thì leader sẽ tự động merge đồng bộ tất cả các nhánh
  
Xử lý conflict:
https://www.youtube.com/watch?v=JtIX3HJKwfo
