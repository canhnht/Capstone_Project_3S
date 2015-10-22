﻿

CREATE TABLE Role
(
roleID int PRIMARY KEY,
roleName varchar(20)
);

CREATE TABLE WorkingStatus
(
statusID int PRIMARY KEY,
statusName varchar(20)
--working status cua shipper: busy, available, away--
);


CREATE TABLE "user"
(
username varchar(20) PRIMARY KEY,
password varchar(255),
userRole int REFERENCES Role(roleID),
-- 0 la admin, 1  --
userStatus int,
 --0 la chua accept, 1 la bi ban, 2 la binh thuong--
 workingStatusID int REFERENCES WorkingStatus(statusID)
 );

CREATE TABLE Profile
(
username varchar(20) REFERENCES "user"(username) PRIMARY KEY,
name varchar(50),
identityCard varchar(10),
address varchar(100),
DoB date,
email varchar(50),
phoneNumber varchar(11),
addressCoordination text
);



CREATE TABLE Store
(
storeID varchar(8) PRIMARY KEY,
name varchar(50),
description text,
address varchar(100),
addressCoordination text,
phoneNumber varchar(11),
email varchar(50),
registerDated timestamp
);

CREATE TABLE ManageStore
(
managerID varchar(20) REFERENCES "user"(username),
storeID varchar(8) REFERENCES Store(storeID),
PRIMARY KEY (managerID, storeID)
);


CREATE TABLE GeneralLedger
(
ledgerID int PRIMARY KEY,
adminID varchar(20) REFERENCES "user"(username),
storeID varchar(8) REFERENCES Store(storeID),
amount BIGINT,
balance BIGINT,
payDate timestamp,
note text,
payFrom int
--1 la cua hang tra cho he thong , 2 la nguoc lai va 3 la he thong tong ket don hang sau 1 tuan--
);

CREATE TABLE Stock
(
stockID int PRIMARY KEY,
name varchar(50),
address varchar(100),
adminID varchar(20) REFERENCES "user"(username),
addressCoordination text
);

CREATE TABLE OrderStatus
(
statusID int PRIMARY KEY,
statusName varchar(20),
nextAction varchar(20)
--Status cua don hang: gathering, delivering,....--
);

CREATE TABLE OrderType
(
typeID int PRIMARY KEY,
typeName varchar(20),
nextAction varchar(20)
--Loai chuyen nhanh hay cham--
);

--isPending: Khi issue đc gửi lên từ shipper. Thì isPending = 'True'
--isDraff: Khi store save đơn hàng mà chưa tạo đơn hàng thì isDraff = 'True'
CREATE TABLE "order"
(
orderID varchar(8) PRIMARY KEY,
storeID varchar(8) REFERENCES Store(storeID),
orderTypeID int REFERENCES OrderType(typeID),
pickUpAddress varchar(100),
deliveryAddress varchar(100),
pickUpDate date,
deliveryDate date,
recipientPhone varchar(11),
recipientName varchar(50),
ledgerID int REFERENCES GeneralLedger(ledgerID),
statusID  int REFERENCES OrderStatus(statusID),
isPending boolean,
isDraff boolean,
fee BIGINT,
CoD BIGINT,
pickUpAddressCoordination text,
deliveryAddressCoordination text
);

CREATE TABLE Task
(
taskID int PRIMARY KEY,
orderID varchar(8) REFERENCES "order"(orderID),
shipperID varchar(20) REFERENCES "user"(username),
adminID varchar(20) REFERENCES "user"(username),
tasktype int NOT NULL,
taskDate date
);

CREATE TABLE Goods
(
goodsID int PRIMARY KEY,
orderID varchar(8) REFERENCES "order"(orderID),
stockID int REFERENCES Stock(stockID),
weight float,
lengthSize float,
widthSize float,
heightSize float,
description text
);

CREATE TABLE ConfirmationCodeType
(
typeID int PRIMARY KEY,
codeType varchar(20)
);

CREATE TABLE ConfirmationCode
(
codeID int PRIMARY KEY,
codeContent int,
typeID int REFERENCES ConfirmationCodeType(typeID),
orderID varchar(8) REFERENCES "order"(orderID)
);



CREATE TABLE IssueCategory
(
categoryID int PRIMARY KEY,
categoryName varchar(50)
);

CREATE TABLE IssuePriority
(
priorityID int PRIMARY KEY,
priority varchar(20)
);

CREATE TABLE Issue
(
issueID int PRIMARY KEY,
category int REFERENCES IssueCategory(categoryID),
priority int REFERENCES IssuePriority(priorityID),
issueName text
);

CREATE TABLE OrderIssue
(
issueID int REFERENCES Issue(issueID),
orderID varchar(8) REFERENCES "order"(orderID),
date date,
description text,
PRIMARY KEY(issueID, orderID)
);

CREATE TABLE OrderLog
(
logID bigint PRIMARY KEY,
orderID varchar(8) REFERENCES "order"(orderID),
storeID varchar(8),
taskID varchar(8),
orderTypeID int,
pickUpAddress varchar(100),
deliveryAddress varchar(100),
pickUpDate date,
deliveryDate date,
recipientPhone varchar(11),
recipientName varchar(50),
ledgerID int,
statusID int,
fee BIGINT,
CoD BIGINT,
pickUpAddressCoordination text,
deliveryAddressCoordination text,
uptimestamp timestamp,
updater varchar(20) REFERENCES "user"(username)
);

CREATE TABLE BannedHistoryLog
(
logID int PRIMARY KEY,
adminID varchar(20) REFERENCES "user"(username),
username varchar(20)REFERENCES "user"(username),
reason text,
bannedTime date,
type varchar(5)
);



/*DROP TABLE BannedHistoryLog;
DROP TABLE OrderLog;
DROP TABLE OrderIssue;
DROP TABLE Issue;
DROP TABLE IssuePriority;
DROP TABLE IssueCategory;
DROP TABLE ConfirmationCode;
DROP TABLE ConfirmationCodeType;
DROP TABLE Goods;
DROP TABLE Task;
DROP TABLE "order";
DROP TABLE OrderType;
DROP TABLE OrderStatus;
DROP TABLE Stock;
DROP TABLE GeneralLedger;
DROP TABLE ManageStore;
DROP TABLE Store;
DROP TABLE Profile;
DROP TABLE "user";
DROP TABLE WorkingStatus;
DROP TABLE Role;*/



