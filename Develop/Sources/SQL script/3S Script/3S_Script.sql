﻿-- role
insert into role values ('1', 'Shipper');
insert into role values ('2', 'Store');
insert into role values ('3', 'Admin');

-- workingstatus

insert into workingstatus values ('1', 'On');
insert into workingstatus values ('2', 'Off');
insert into workingstatus values ('3', 'Busy');

-- user

insert into "user" values ('hoang', 'pass1', '1', '3', 'token1', '1');
insert into "user" values ('huy', 'pass2', '3', '1', 'token2', '1');
insert into "user" values ('quyen', 'pass3', '3', '2', 'token3', '1');
insert into "user" values ('khanh', 'pass4', '2', '3', 'token4', '1');
insert into "user" values ('nhung', 'pass5', '1', '1', 'token5', '1');

-- profile

insert into profile values ('hoang', 'Nguyen Khac Hoang', '12213444', 'Ha Dong - Ha Noi', '1993-4-5', 'hoangnk@gmail.com', '0988277221', '1234,2344');
insert into profile values ('huy', 'Tran Dinh Hoang Huy', '23221123', 'Da nang - Da Nang', '1993-5-1', 'huytdh@gmail.com', '0166466566', '43434,43434');
insert into profile values ('quyen', 'Nguyen Van Quyen', '33323222', 'Luc Nam - Bac Giang', '1993-3-26', 'quyennv@gmail.com', '0167932122', '-34343,3434');
insert into profile values ('khanh', 'Kieu Cao Khanh', '1232323', 'Thach That - Ha Noi', '1993-8-5', 'khanhkc@gmail.com', '093332212', '3434,-3434');
insert into profile values ('nhung', 'Nguyen Thi Hong Nhung', '232322', 'Xuan Mai - Son Tay', '1993-10-10', 'nhungnth@gmail.com', '0988888302', '-343443,-3434');

-- store
insert into store values ('str1', 'habbit shop', 'beautiful shop', 'Tu Liem - Ha Noi', '2323,2323', '0988666543', 'str1@gmail.com');
insert into store values ('str2', 'sheep shop', 'beautiful shop', 'Cau Giay - Ha Noi', '-2323,928392', '0988262712', 'str2@gmail.com');
insert into store values ('str3', 'wall shop', 'beautiful shop', 'Hoan Kiem - Ha Noi', '-23232,-2332223', '0162928111', 'str3@gmail.com');

-- managestore

insert into managestore values ('huy', 'str1');
insert into managestore values ('quyen', 'str2');

-- generalledger

insert into generalledger values ('1', 'quyen', 'str1', '300000', '10000', '2015-3-16', 'sample note', '1');
insert into generalledger values ('2', 'huy', 'str2', '400000', '20000', '2015-6-10', 'sample note', '2');

-- stock

insert into stock values ('1', 'Cau Giay Stock', '34 Xuan Thuy - Cau Giay - Ha Noi', 'huy', '23123,2323');
insert into stock values ('2', 'Hoan Kiem Stock', 'Hoan Kiem - Ha Noi', 'quyen', '12323,-2323');

-- orderstatus
-- Trang thai tao don hang ban dau la Waiting: 1
-- Den Store lay hang, va mang hang ve kho: 2
-- Store cancel don hang thi cung mang hang ve kho : 2
-- Hang luu trong kho: 3
-- Giao hang: 4
-- Shipper gap issue thi pending don hang: 5
-- Neu store huy don hang: 6
-- K/H khong nhan hang thi se return ve store or stock: 7
insert into orderstatus values ('1', 'Waiting');
insert into orderstatus values ('2', 'Carrying');
insert into orderstatus values ('3', 'In Stock');
insert into orderstatus values ('4', 'Delivering');
insert into orderstatus values ('5', 'Pending');
insert into orderstatus values ('6', 'Canceled');
insert into orderstatus values ('7', 'Returning');

-- ordertype

insert into ordertype  values ('1', 'normal');
insert into ordertype  values ('2', 'express');

-- task
insert into task values ('1', 'hoang', 'quyen', '2015-2-9');
insert into task values ('2', 'nhung', 'quyen', '2015-2-10');
insert into task values ('3', 'nhung', 'huy', '2015-2-15');

-- order
insert into "order" values ('ord1', 'str1', '1', '1', 'Tu Liem - Ha Noi', 'Cau Giay - Ha Noi', '2015-3-19', '2015-3-21', '01687555261', 'Nguyen Van Quyen', '1', '1', '20000', '0', '23232,32323', '2323,23232');
insert into "order" values ('ord2', 'str2', '2', '2', 'Ho Tung Mau - Ha Noi', 'Hoan Kiem - Ha Noi', '2015-5-23', '2015-5-25', '0988627075', 'Nguyen Van Long', '2', '2', '0', '2000000', '2323,-23233', '2323,-23233');

-- goods

insert into goods values ('1', 'ord1', '1', '32.00', '20', '50', '35', 'Very height');
insert into goods values ('2', 'ord2', '2', '34.00', '34', '34', '50', 'Very width');

-- confirmationcodetype
insert into confirmationcodetype values ('1', 'Gathering');
insert into confirmationcodetype values ('2', 'In Stock');
insert into confirmationcodetype values ('3', 'Out Stock');
insert into confirmationcodetype values ('4', 'Deliver');

-- confirmationcode
insert into confirmationcode values ('1', '234222', '1', 'ord1');
insert into confirmationcode values ('2', '233333', '2', 'ord1');
insert into confirmationcode values ('3', '333222', '3', 'ord1');
insert into confirmationcode values ('4', '122111', '4', 'ord1');

insert into confirmationcode values ('5', '123987', '1', 'ord2');
insert into confirmationcode values ('6', '998022', '2', 'ord2');
insert into confirmationcode values ('7', '090909', '3', 'ord2');
insert into confirmationcode values ('8', '080872', '4', 'ord2');


-- issuecategory
insert into issuecategory  values ('1', 'Ca Nhan');
insert into issuecategory  values ('2', 'Phuong Tien');
insert into issuecategory  values ('3', 'Thoi Tiet');

-- issuepriority
insert into issuepriority values ('1', 'High');
insert into issuepriority values ('2', 'Medium');
insert into issuepriority values ('3', 'Low');

-- issue
insert into issue   values ('1', '1', '2', 'Toi co viec ban');
insert into issue   values ('2', '1', '3', 'Hom nay co bao');
insert into issue   values ('3', '2', '2', 'Xe toi bi thung nop');
insert into issue   values ('4', '2', '3', 'Dien thoai toi het pin');
insert into issue   values ('5', '3', '1', 'Hom nay co bao');

-- orderissue
insert into orderissue values ('1', 'ord1', '2015-12-4', 'this is description 1');
insert into orderissue values ('2', 'ord1', '2015-12-4', 'this is description 2');
insert into orderissue values ('3', 'ord2', '2015-4-19', 'this is description 3');
insert into orderissue values ('4', 'ord2', '2015-4-19', 'this is description 4');

-- orderlog
insert into orderlog  values ('1', 'ord1', 'str1', '1', '1', 'Tu Liem - Ha Noi', 'Cau Giay - Ha Noi', '2015-3-19', '2015-3-21', '01687555261', 'Nguyen Van Quyen', '1', '1', '20000', '0', '23232,32323', '2323,23232', '2015-9-8', 'huy');
insert into orderlog values ('2', 'ord2', 'str2', '2', '2', 'Ho Tung Mau - Ha Noi', 'Hoan Kiem - Ha Noi', '2015-5-23', '2015-5-25', '0988627075', 'Nguyen Van Long', '2', '2', '0', '2000000', '2323,-23233', '2323,-23233', '2015-4-5', 'quyen');

-- bannedhistorylog
insert into bannedhistorylog values ('1', 'huy', 'hoang', 'Reject order', '2015-9-8');