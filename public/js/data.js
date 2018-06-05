document.getElementById('bookname').innerHTML = "Tên sách: Truyện này bình thường quá";
document.getElementById('typebook').innerHTML = "Loại sách: Truyện ngắn";
document.getElementById('bookprice').innerHTML = "Giá: 1111Đ";
document.getElementById('author').innerHTML = "Tác giả: Vũ Văn Mạnh";
document.getElementById('viewsbook').innerHTML = "Lượt xem: 0";
document.getElementById('bookcontent').innerHTML = "rtrtet";
window.onload = function() {if(!window.location.hash) {window.location = window.location + '#loaded';window.location.reload();}}